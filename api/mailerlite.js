// 📧 Vercel Serverless Function für MailerLite API
// MailerLite API v2 - https://developers.mailerlite.com/docs/

// MailerLite API configuration
const MAILERLITE_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiOGU4OWRjNmQxYmM3MzNkNzU4Y2UwNDkxYzRiMDZlYzMzZGI3NDgyOTlkOTVhMzQ1MDhlOTJhZDlkNDA2OWVkZjI5YTgxNjM3YjkxYTUyNmUiLCJpYXQiOjE3NjgzMzE0MzAuNzE3NjQ2LCJuYmYiOjE3NjgzMzE0MzAuNzE3NjQ5LCJleHAiOjQ5MjQwMDUwMzAuNzA0MDY1LCJzdWIiOiIyMDM0NTEyIiwic2NvcGVzIjpbXX0.WsZPCHSNc9sIbrZKR4ka5VgcpDdW08xCc8AWdcPd9oDMRvsjAvKuSsdg_FEL5q1haJV1toDczF6nfAR8rFQ9KSG8Trdatuy03n7oaqXzitZFKz7aeFD_3_rYLJz0WqPuoK6mqLwTv6wAB-t1z2Wy8e3KC-L_N1nlYuzhneFI5a4jxhc8ayUwxThbuxJvMd5sNipQWi4-OVeqbAF6dLgXF32Q33SvRn_dzw0Jy76871clSMGpMvzZ60fXMXLByhviyorE7dIP71dD1yFLDWyN8m3ED07r7ncnX__1PWuLxGs0qzC24W9FlCOIJJlQ_c0Lso_q2lFIAnPCK6I81uL16VpxGE3y0O-P21_c1Azj0Lwj-lSdmk0V1mhBy_YufJDkzEYHnXiIcoQdLvUfK1nUbFz9gg10MEVCPa0bXqRAmTYiNzwri2rQUF11JEBTQX_AWFEJgo-ikkHcC3ln81bvnSxwZrq3XEd2xIUDGOKD-qr2IBl866VSCDpGCfTuDKWd6-f36oNrdGa_mTfIKPbla31-ErUY4pdYSEAeVCZmhrXB-TzXOB8z0aQY9XR5S-2YH9C7c_4SJbErJLtGlPnd6hjUtqT42I1qY9SW4X59jgNtBo-MSAHC7-lVu5dAUm6Lnyz95UYjXR-lyJyg7oX9LgFi7ypmwNeG1wA-gX1Yau0';
const MAILERLITE_GROUP_ID = '176508406386918528';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  try {

    // Extract request data
    const { email, name, archetype, archetypePercentage, top3Results } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email address required' });
    }

    console.log('📮 Adding to MailerLite:', email);
    console.log('🎯 Archetype:', archetype, '(' + archetypePercentage + '%)');

    // MailerLite API URL
    const apiUrl = 'https://connect.mailerlite.com/api/subscribers';
    
    // Prepare subscriber data with custom fields
    const subscriberData = {
      email: email,
      fields: {
        name: name || '',
        // Custom fields for personalization
        archetype: archetype || '',
        archetype_percent: archetypePercentage ? parseInt(archetypePercentage) : 0,
        test_date: new Date().toLocaleDateString('en-US'),
        // Top 3 archetypes for advanced segmentation
        archetype_1: top3Results?.[0]?.name || '',
        archetype_1_percent: top3Results?.[0]?.percentage || 0,
        archetype_2: top3Results?.[1]?.name || '',
        archetype_2_percent: top3Results?.[1]?.percentage || 0,
        archetype_3: top3Results?.[2]?.name || '',
        archetype_3_percent: top3Results?.[2]?.percentage || 0
      },
      // Add to specific group for automation trigger
      groups: [MAILERLITE_GROUP_ID]
    };
    
    console.log('📤 Sending to MailerLite:', subscriberData);
    
    // Call MailerLite API
    const mailerLiteResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`
      },
      body: JSON.stringify(subscriberData)
    });
    
    const result = await mailerLiteResponse.json();
    
    if (mailerLiteResponse.ok) {
      console.log('✅ Successfully added to MailerLite');
      return res.status(200).json({ 
        success: true, 
        message: 'Successfully added',
        subscriber_id: result.data?.id
      });
    } else {
      // Subscriber already exists is not an error
      if (result.message && result.message.includes('already exists')) {
        console.log('👤 Contact already in MailerLite - that\'s ok!');
        
        // Update subscriber instead of creating new one
        const updateUrl = `https://connect.mailerlite.com/api/subscribers/${email}`;
        const updateResponse = await fetch(updateUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${MAILERLITE_API_KEY}`
          },
          body: JSON.stringify({ fields: subscriberData.fields, groups: subscriberData.groups })
        });
        
        if (updateResponse.ok) {
          console.log('✅ Contact data updated');
          return res.status(200).json({ 
            success: true, 
            message: 'Contact updated',
            existing: true
          });
        }
      }
      
      console.warn('⚠️ MailerLite API Warning:', result.message || 'Unknown error');
      return res.status(400).json({ 
        error: result.message || 'MailerLite API Error',
        detail: result.errors || 'No details available'
      });
    }
    
  } catch (error) {
    console.error('❌ Serverless Function Error:', error);
    return res.status(500).json({ 
      error: 'Server Error',
      message: error.message 
    });
  }
}
