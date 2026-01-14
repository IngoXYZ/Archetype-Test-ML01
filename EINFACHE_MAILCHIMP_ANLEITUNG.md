
# 🚀 **Einfache Mailchimp-Anleitung (2 Minuten)**

## Problem: "Signup forms" nicht gefunden?

Die neue Mailchimp-Oberfläche ist anders. Hier sind **3 einfache Wege**:

---

## 🎯 **Methode 1: Über "Forms" (Einfachster Weg)**

### Schritt 1: Forms finden
1. **Hauptmenü:** Klicke auf **"Forms"** (normalerweise links im Menü)
2. **Oder:** Audience → Forms

### Schritt 2: Embedded Form erstellen
1. Klicke **"Create Form"** 
2. Wähle **"Embedded form"**
3. Wähle deine **Audience** aus
4. Klicke **"Begin"**

### Schritt 3: URL kopieren
1. Scrolle runter bis **"Copy/paste onto your site"**
2. Du siehst HTML-Code wie:
   ```html
   <form action="https://xyz.us21.list-manage.com/subscribe/post?u=ABC123&id=DEF456">
   ```
3. **Kopiere nur den ersten Teil:** `https://xyz.us21.list-manage.com/subscribe/post`

---

## 🎯 **Methode 2: Über Settings (Alternativer Weg)**

1. Gehe zu **"Audience" → "All contacts"**
2. Klicke **"Settings"**
3. Klicke **"Audience fields and *|MERGE|* tags"**
4. Scrolle runter zu **"Integration mappings and form URLs"**
5. Dort steht die **"Subscription form URL"**

---

## 🎯 **Methode 3: URL selbst bauen (Falls nichts funktioniert)**

### Die URL hat immer dieses Format:
```
https://[deine-domain].[server-region].list-manage.com/subscribe/post
```

### Wie finde ich meine Domain und Region?
1. Schaue in deine **Mailchimp-URL** wenn du eingeloggt bist
2. Beispiele:
   - Du siehst: `https://us21.admin.mailchimp.com/...` 
   - → Deine URL: `https://[deine-firma].us21.list-manage.com/subscribe/post`
   
   - Du siehst: `https://eu.admin.mailchimp.com/...`
   - → Deine URL: `https://[deine-firma].eu.list-manage.com/subscribe/post`

---

## 📋 **List ID finden (Super einfach):**

### Schritt 1:
1. Gehe zu **"Audience" → "All contacts"**
2. Klicke **"Settings"**
3. Klicke **"Audience name and defaults"**

### Schritt 2:
Am Ende der Seite steht:
```
List ID: abc123def456
```

---

## 🛠️ **Jetzt in der App eintragen:**

Öffne `js/app.js` und ändere **Zeile 503-504**:

```javascript
// Deine Werte eintragen:
const MAILCHIMP_URL = 'https://deine-domain.us21.list-manage.com/subscribe/post';
const LIST_ID = 'deine-list-id-hier';
```

---

## 🧪 **Testen:**

1. **Test durchführen**
2. **Console öffnen** (F12)
3. **Schauen nach:** `✅ Erfolgreich zu Mailchimp hinzugefügt`
4. **Mailchimp-Liste prüfen:** Neuer Kontakt sollte da sein

---

## ❓ **Immer noch nicht gefunden?**

### **Screenshot machen:**
1. Mache einen Screenshot von deinem Mailchimp-Dashboard
2. Zeige mir, was du siehst
3. Ich kann dir dann den genauen Pfad zeigen

### **Oder alternative Lösung:**
Falls Mailchimp zu kompliziert ist, können wir auch:
- **Google Sheets** Integration (einfacher)
- **Direct Email** ohne Mailchimp
- **CSV Export** für manuelle Verwaltung

**Das Wichtigste: Die App funktioniert auch ohne Mailchimp!** 
Die E-Mails werden trotzdem versendet. 📧✅
