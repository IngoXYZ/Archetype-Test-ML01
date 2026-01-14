
# 🤖 Mailchimp Automation: Welcome Sequence für Archetypen-Test

## 🎯 Ziel
Automatische Welcome-E-Mail-Serie senden, wenn jemand den Archetypen-Test abschließt.

## 🔧 Setup-Optionen

### Option 1: List-Based Trigger (Einfach)
**Trigger:** Neue Abonnenten zur Liste

1. **Mailchimp Dashboard** → **Automations** → **Create** → **Welcome new subscribers**
2. **Audience auswählen:** Ihre Archetypen-Liste (ffc0301d62)
3. **Trigger:** "When someone subscribes to audience"
4. **E-Mail-Serie erstellen:**
   - E-Mail 1: Sofort - Willkommen + Archetyp-Zusammenfassung
   - E-Mail 2: Nach 3 Tagen - Vertiefung des Hauptarchetyps
   - E-Mail 3: Nach 1 Woche - Umsetzungstipps
   - E-Mail 4: Nach 2 Wochen - Weitere Tests/Angebote

### Option 2: Tag-Based Trigger (Empfohlen)
**Trigger:** Spezifischer Tag wird hinzugefügt

**Vorteile:**
- ✅ Genauer Trigger (nur Test-Teilnehmer)  
- ✅ Keine Verwirrung mit anderen Abonnenten
- ✅ Bessere Segmentierung
- ✅ Verschiedene Sequences pro Archetyp möglich

## 🏷️ Tag-Based Setup (Detailliert)

### Schritt 1: Tags im Code erweitern

Aktuell setzen wir nur einen generischen Tag. Lassen Sie uns das spezifischer machen:

```javascript
// In api/mailchimp.js erweitern:
const subscriberData = {
  email_address: email,
  status: 'subscribed',
  merge_fields: {
    FNAME: name || '',
    ARCHETYPE: archetype || '',
    TEST_DATE: new Date().toLocaleDateString('de-DE')
  },
  tags: [
    'archetypen-test',           // Basis-Tag
    'welcome-sequence',          // Trigger für Automation  
    `archetyp-${archetype.toLowerCase().replace(/\s+/g, '-')}` // Archetyp-spezifischer Tag
  ]
};
```

### Schritt 2: Mailchimp Automation erstellen

1. **Mailchimp** → **Automations** → **Create** → **Custom**
2. **Trigger:** "When a tag is added to a contact"
3. **Tag auswählen:** "welcome-sequence"
4. **Audience:** Ihre Liste (ffc0301d62)

### Schritt 3: E-Mail-Serie aufbauen

**E-Mail 1: Sofort nach Tag-Addition**
```
Betreff: 🎯 Willkommen! Ihr Archetyp-Ergebnis im Detail

Inhalt:
- Begrüßung
- Kurze Zusammenfassung des Hauptarchetyps
- Link zu detaillierter Analyse
- Was als nächstes kommt
```

**E-Mail 2: 3 Tage später**
```
Betreff: 🔍 Verstehen Sie Ihren [ARCHETYP] besser

Inhalt:
- Vertiefung der Archetyp-Eigenschaften
- Praktische Anwendung im Beruf/Leben
- Case Studies ähnlicher Archetypen
```

**E-Mail 3: 1 Woche später**
```
Betreff: 💡 So nutzen Sie Ihre [ARCHETYP]-Stärken optimal

Inhalt:
- Konkrete Handlungsempfehlungen
- Herausforderungen überwinden
- Tools und Ressourcen
```

## 🎨 Erweiterte Segmentierung

### Archetyp-spezifische Sequences
Erstellen Sie separate Automationen für jeden Archetyp:

```
Tag: "archetyp-der-weise" → Weise-spezifische E-Mail-Serie
Tag: "archetyp-der-held" → Held-spezifische E-Mail-Serie  
Tag: "archetyp-der-entdecker" → Entdecker-spezifische E-Mail-Serie
...
```

### Merge Fields nutzen
In Ihren E-Mails können Sie personalisieren:

```html
Hallo *|FNAME|*,

als *|ARCHETYPE|* haben Sie besondere Stärken...

Sie haben den Test am *|TEST_DATE|* gemacht...
```

## 🔄 Automation Flow Beispiel

```
Trigger: Tag "welcome-sequence" hinzugefügt
    ↓
Delay: 0 Minuten
    ↓
E-Mail 1: Welcome + Archetyp-Übersicht
    ↓
Delay: 3 Tage
    ↓
E-Mail 2: Vertiefung [archetyp-spezifisch basierend auf Tag]
    ↓
Delay: 4 Tage (Total: 1 Woche)
    ↓
E-Mail 3: Handlungsempfehlungen
    ↓
Delay: 1 Woche (Total: 2 Wochen)
    ↓
E-Mail 4: Weitere Tests/Angebote
```

## 🧪 Testing

1. **Test-Kontakt hinzufügen** mit korrekten Tags
2. **Automation auslösen** und Timeline prüfen
3. **E-Mails überprüfen** auf korrekte Personalisierung
4. **Performance tracken** (Open Rates, Clicks, etc.)

## 📊 Tracking & Optimierung

**Wichtige Metriken:**
- Open Rate der Welcome-Serie
- Click-Through Rate auf Links
- Conversion zu weiteren Angeboten
- Unsubscribe Rate

**A/B Tests:**
- Verschiedene Betreffs
- Timing zwischen E-Mails
- Content-Variationen pro Archetyp

## 🚀 Go-Live Checklist

- [ ] Tags im API-Code erweitert
- [ ] Mailchimp Automation erstellt  
- [ ] E-Mail-Templates designed
- [ ] Personalisierung mit Merge Fields
- [ ] Test-Durchlauf erfolgreich
- [ ] Performance-Tracking eingerichtet

Die API-Integration funktioniert perfekt als Automation-Trigger! 🎯
