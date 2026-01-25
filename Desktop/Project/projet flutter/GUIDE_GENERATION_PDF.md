# 📘 Guide Complet - Génération PDF du Rapport PFE

## 🎯 Objectif
Convertir le fichier `rapportPFE.md` (154 KB, 2910+ lignes) en un document PDF professionnel pour la soutenance.

---

## ⚡ Méthode Rapide - Extension VS Code (RECOMMANDÉ)

### Étape 1: Installer l'extension
1. Ouvrir VS Code
2. Aller dans Extensions (`Ctrl+Shift+X`)
3. Rechercher: **"Markdown PDF"** (par yzane)
4. Cliquer sur "Installer"

### Étape 2: Configurer l'extension (optionnel)
Créer/modifier `.vscode/settings.json` dans votre projet:

```json
{
  "markdown-pdf.executablePath": "",
  "markdown-pdf.styles": [],
  "markdown-pdf.stylesRelativePathFile": false,
  "markdown-pdf.includeDefaultStyles": true,
  "markdown-pdf.highlightStyle": "github.css",
  "markdown-pdf.breaks": false,
  "markdown-pdf.emoji": true,
  "markdown-pdf.outputDirectory": "",
  "markdown-pdf.outputDirectoryRelativePathFile": false,
  "markdown-pdf.displayHeaderFooter": true,
  "markdown-pdf.headerTemplate": "<div style='font-size:9px; margin: 0 auto;'> <span>Rapport PFE - Dräxlmaier Tunisie</span></div>",
  "markdown-pdf.footerTemplate": "<div style='font-size:9px; margin: 0 auto;'> <span class='pageNumber'></span> / <span class='totalPages'></span></div>",
  "markdown-pdf.margin.top": "1.5cm",
  "markdown-pdf.margin.bottom": "1.5cm",
  "markdown-pdf.margin.right": "1.5cm",
  "markdown-pdf.margin.left": "1.5cm",
  "markdown-pdf.format": "A4",
  "markdown-pdf.orientation": "portrait"
}
```

### Étape 3: Générer le PDF
1. Ouvrir `rapportPFE.md` dans VS Code
2. Appuyer sur `Ctrl+Shift+P` (ou `F1`)
3. Taper: **"Markdown PDF: Export (pdf)"**
4. Attendre la génération (peut prendre 10-30 secondes)
5. Le PDF sera créé dans le même dossier: `rapportPFE.pdf`

---

## 🔧 Méthode Professionnelle - Pandoc + LaTeX

### Installation (Windows)

#### Option A: Avec Chocolatey (Recommandé)
```powershell
# Exécuter PowerShell en tant qu'administrateur
Set-ExecutionPolicy Bypass -Scope Process -Force

# Installer Chocolatey si pas déjà fait
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Installer Pandoc et MiKTeX
choco install pandoc miktex -y

# Redémarrer le terminal
```

#### Option B: Téléchargement manuel
1. **Pandoc:** https://pandoc.org/installing.html
2. **MiKTeX:** https://miktex.org/download

### Génération du PDF avec Pandoc

```powershell
# Commande de base
pandoc rapportPFE.md -o Rapport_PFE_Draxlmaier_2026.pdf

# Commande complète avec options (RECOMMANDÉ)
pandoc rapportPFE.md -o Rapport_PFE_Draxlmaier_2026.pdf `
  --pdf-engine=xelatex `
  --from=markdown+emoji+pipe_tables+grid_tables `
  --to=pdf `
  --toc `
  --toc-depth=3 `
  --number-sections `
  --highlight-style=tango `
  -V geometry:margin=2.5cm `
  -V fontsize=11pt `
  -V documentclass=report `
  -V lang=fr-FR `
  -V papersize=a4 `
  -V mainfont="Times New Roman" `
  -V monofont="Courier New" `
  -V colorlinks=true `
  -V linkcolor=blue `
  -V urlcolor=blue `
  -V toccolor=black `
  --metadata title="Application Mobile de Communication et Gestion des Employés" `
  --metadata author="[Votre Nom]" `
  --metadata date="Janvier 2026"
```

### Script automatique
Utiliser le script fourni:
```powershell
.\convert-to-pdf.ps1
```

---

## 🌐 Méthode En Ligne (Sans Installation)

### Option 1: MarkdownToPDF.com
1. Aller sur https://www.markdowntopdf.com/
2. Glisser-déposer `rapportPFE.md`
3. Cliquer "Convert"
4. Télécharger le PDF généré

**Avantages:** Rapide, pas d'installation
**Inconvénients:** Limite de taille (vérifier), pas de personnalisation avancée

### Option 2: MD2PDF
1. Aller sur https://md2pdf.netlify.app/
2. Uploader le fichier
3. Télécharger le résultat

### Option 3: CloudConvert
1. Aller sur https://cloudconvert.com/md-to-pdf
2. Upload `rapportPFE.md`
3. Configurer les options (marges, police, etc.)
4. Convertir et télécharger

---

## 📝 Méthode Typora (Éditeur WYSIWYG)

### Installation
1. Télécharger Typora: https://typora.io/
2. Installer (licence payante après essai gratuit ~15€)

### Utilisation
1. Ouvrir `rapportPFE.md` dans Typora
2. **Fichier → Exporter → PDF**
3. Configurer les options:
   - Thème: Academic / GitHub / Vue
   - Marges: 2.5cm
   - Taille police: 11pt
4. Exporter

**Avantages:**
- Prévisualisation en temps réel
- Personnalisation CSS avancée
- Qualité d'export excellente
- Support complet de Markdown + extensions

---

## 🎨 Personnalisation Avancée

### Ajouter une page de garde personnalisée

Créer `cover.md`:

```markdown
---
title: "Application Mobile de Communication et Gestion des Employés"
subtitle: "Projet de Fin d'Études"
author: "[Votre Nom]"
date: "Janvier 2026"
institute: "[Votre Établissement]"
supervisor: "[Nom Encadrant]"
logo: "assets/logo-draxlmaier.png"
---

\newpage
```

Puis générer avec:
```powershell
pandoc cover.md rapportPFE.md -o Rapport_Final.pdf [options...]
```

### Ajouter un style CSS personnalisé

Créer `style.css`:

```css
body {
  font-family: 'Times New Roman', serif;
  font-size: 11pt;
  line-height: 1.6;
}

h1 {
  color: #003366;
  border-bottom: 3px solid #0066cc;
  padding-bottom: 10px;
}

h2 {
  color: #004080;
  margin-top: 30px;
}

code {
  background-color: #f4f4f4;
  padding: 2px 5px;
  border-radius: 3px;
}

pre {
  background-color: #f8f8f8;
  padding: 15px;
  border-left: 4px solid #0066cc;
  overflow-x: auto;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin: 20px 0;
}

th {
  background-color: #0066cc;
  color: white;
  padding: 10px;
}

td {
  padding: 8px;
  border: 1px solid #ddd;
}
```

Utiliser avec Pandoc:
```powershell
pandoc rapportPFE.md -o Rapport.pdf --css=style.css [...]
```

---

## ✅ Checklist Avant Génération

- [ ] Remplacer `[Votre nom]` par votre nom complet
- [ ] Remplacer `[Nom de l'encadreur académique]`
- [ ] Remplacer `[Nom Encadrant Entreprise]`
- [ ] Remplacer `[Nom de votre école/université]`
- [ ] Remplacer `[À compléter]` par la date de soutenance
- [ ] Vérifier que tous les liens fonctionnent
- [ ] Vérifier l'orthographe (`F7` dans VS Code avec extension)
- [ ] Vérifier la numérotation des chapitres
- [ ] S'assurer que les diagrammes s'affichent correctement
- [ ] Relire la bibliographie (40 références)

---

## 🐛 Dépannage

### "Pandoc command not found"
- Redémarrer le terminal après installation
- Vérifier: `$env:PATH` contient le chemin Pandoc
- Réinstaller: `choco install pandoc --force`

### "xelatex not found"
- Installer MiKTeX: `choco install miktex`
- Ou utiliser `--pdf-engine=pdflatex`

### "Failed to generate PDF"
- Vérifier qu'il n'y a pas d'erreur dans le Markdown
- Essayer sans `--toc` d'abord
- Utiliser `--verbose` pour voir les erreurs détaillées

### Les diagrammes PlantUML/Mermaid ne s'affichent pas
- Solution 1: Remplacer par des images générées à l'avance
- Solution 2: Utiliser un filtre Pandoc spécifique
- Solution 3: Utiliser la méthode VS Code (gère mieux les diagrammes)

### Le PDF est trop volumineux
```powershell
# Compresser le PDF (avec GhostScript)
choco install ghostscript -y
gswin64c -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=Rapport_PFE_Compressed.pdf Rapport_PFE.pdf
```

---

## 📊 Résultat Attendu

**Format:** PDF A4 (21 x 29.7 cm)
**Pages:** ~85-100 pages
**Taille fichier:** 3-8 MB (selon images et diagrammes)
**Police:** Times New Roman 11pt
**Marges:** 2.5 cm (toutes)
**Orientation:** Portrait
**Table des matières:** Automatique avec liens
**Numérotation:** Chapitres et sous-chapitres
**Qualité:** Professionnelle, prête pour impression

---

## 💡 Conseils Professionnels

1. **Imprimer un exemplaire test** avant la soutenance
2. **Vérifier la lisibilité** des codes et diagrammes
3. **Préparer plusieurs formats:**
   - PDF principal (pour projection)
   - PDF compressé (pour email)
   - Version Word/DOCX (backup)
4. **Sauvegarder sur plusieurs supports:**
   - Cloud (Google Drive, OneDrive)
   - Clé USB
   - Email à soi-même
5. **Apporter à la soutenance:**
   - 3 copies imprimées reliées
   - Clé USB avec PDF
   - Backup sur ordinateur portable

---

## 📞 Support

Si vous rencontrez des problèmes:

1. Vérifier les logs d'erreur
2. Consulter la documentation:
   - Pandoc: https://pandoc.org/MANUAL.html
   - Markdown PDF: https://github.com/yzane/vscode-markdown-pdf
3. Essayer une méthode alternative
4. Poster sur Stack Overflow avec tag `[pandoc]` ou `[markdown]`

---

**Document créé le:** 20 Janvier 2026
**Dernière mise à jour:** 20 Janvier 2026
**Version:** 1.0

**Bon courage pour votre soutenance! 🎓🚀**
