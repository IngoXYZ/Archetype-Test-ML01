
// 📧 Vercel Serverless Function für Mailchimp API
// Diese Function läuft auf dem Server und umgeht CORS-Probleme

export default async function handler(req, res) {
  // Nur POST-Requests erlauben
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Nur POST-Requests erlaubt' });
  }

  try {
    // Environment Variables von Vercel lesen
    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
    const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;
    const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID || 'ffc0301d62';

    // Prüfen ob alle Variablen gesetzt sind
    if (!MAILCHIMP_API_KEY || !MAILCHIMP_SERVER_PREFIX) {
      console.error('❌ Mailchimp Umgebungsvariablen fehlen');
      return res.status(500).json({ 
        error: 'Mailchimp nicht konfiguriert',
        missing: {
          api_key: !MAILCHIMP_API_KEY,
          server_prefix: !MAILCHIMP_SERVER_PREFIX
        }
      });
    }

    // Request-Daten extrahieren
    const { email, name, archetype } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'E-Mail-Adresse erforderlich' });
    }

    console.log('📮 Füge zu Mailchimp hinzu:', email);

    // Mailchimp API URL
    const apiUrl = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;
    
    // Subscriber-Daten vorbereiten
    const subscriberData = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: name || '',
        ARCHETYPE: archetype || '',
        TEST_DATE: new Date().toLocaleDateString('de-DE')
      },
      tags: [
        'archetypen-test',           // Basis-Tag für alle Test-Teilnehmer
        'welcome-sequence',          // Trigger für Welcome Automation
        `archetyp-${archetype.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-')}` // Archetyp-spezifischer Tag
      ]
    };
    
    console.log('📤 Sende an Mailchimp:', subscriberData);
    
    // Mailchimp API aufrufen
    const mailchimpResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`
      },
      body: JSON.stringify(subscriberData)
    });
    
    const result = await mailchimpResponse.json();
    
    if (mailchimpResponse.ok) {
      console.log('✅ Erfolgreich zu Mailchimp hinzugefügt');
      return res.status(200).json({ 
        success: true, 
        message: 'Erfolgreich hinzugefügt',
        status: result.status 
      });
    } else {
      // Member exists ist kein Fehler
      if (result.title === 'Member Exists') {
        console.log('👤 Kontakt bereits in Liste - das ist ok!');
        return res.status(200).json({ 
          success: true, 
          message: 'Kontakt bereits vorhanden',
          existing: true
        });
      }
      
      console.warn('⚠️ Mailchimp API Warnung:', result.title);
      return res.status(400).json({ 
        error: result.title || 'Mailchimp API Fehler',
        detail: result.detail || 'Keine Details verfügbar'
      });
    }
    
  } catch (error) {
    console.error('❌ Serverless Function Fehler:', error);
    return res.status(500).json({ 
      error: 'Server-Fehler',
      message: error.message 
    });
  }
}
