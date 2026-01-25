# Script de génération PDF du rapport PFE
# Date: 20 janvier 2026

Write-Host "=== Génération du rapport PFE en PDF ===" -ForegroundColor Green
Write-Host ""

$inputFile = "rapportPFE.md"
$outputFile = "Rapport_PFE_Employee_Communication_App.pdf"

# Vérifier si le fichier Markdown existe
if (-not (Test-Path $inputFile)) {
    Write-Host "❌ Erreur: Le fichier $inputFile n'existe pas!" -ForegroundColor Red
    exit 1
}

Write-Host "📄 Fichier source: $inputFile"
Write-Host "📊 Taille: $((Get-Item $inputFile).Length / 1KB) KB"
Write-Host ""

# Option 1: Utiliser Pandoc (si installé)
Write-Host "🔍 Recherche de Pandoc..." -ForegroundColor Yellow
$pandoc = Get-Command pandoc -ErrorAction SilentlyContinue

if ($pandoc) {
    Write-Host "✅ Pandoc trouvé! Génération du PDF..." -ForegroundColor Green
    
    pandoc $inputFile `
        -o $outputFile `
        --pdf-engine=xelatex `
        -V geometry:margin=2.5cm `
        -V fontsize=11pt `
        -V documentclass=report `
        -V lang=fr `
        -V papersize=a4 `
        --toc `
        --toc-depth=3 `
        --number-sections `
        --highlight-style=tango
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ PDF généré avec succès: $outputFile" -ForegroundColor Green
        Write-Host "📊 Taille du PDF: $((Get-Item $outputFile).Length / 1KB) KB"
        Start-Process $outputFile
        exit 0
    } else {
        Write-Host "❌ Erreur lors de la génération avec Pandoc" -ForegroundColor Red
    }
} else {
    Write-Host "⚠️  Pandoc non trouvé." -ForegroundColor Yellow
}

# Option 2: Installer Pandoc via Chocolatey
Write-Host ""
Write-Host "Option 1: Installer Pandoc avec Chocolatey" -ForegroundColor Cyan
Write-Host "  Commande: choco install pandoc"
Write-Host ""

# Option 3: Utiliser un convertisseur en ligne
Write-Host "Option 2: Convertisseurs en ligne recommandés:" -ForegroundColor Cyan
Write-Host "  - https://www.markdowntopdf.com/"
Write-Host "  - https://md2pdf.netlify.app/"
Write-Host "  - https://cloudconvert.com/md-to-pdf"
Write-Host ""

# Option 4: Ouvrir dans VS Code avec extension Markdown PDF
Write-Host "Option 3: Extension VS Code 'Markdown PDF'" -ForegroundColor Cyan
Write-Host "  1. Installer l'extension: yzane.markdown-pdf"
Write-Host "  2. Ouvrir $inputFile"
Write-Host "  3. Ctrl+Shift+P → 'Markdown PDF: Export (pdf)'"
Write-Host ""

# Option 5: Ouvrir dans Typora
Write-Host "Option 4: Utiliser Typora (éditeur Markdown)" -ForegroundColor Cyan
Write-Host "  Télécharger: https://typora.io/"
Write-Host "  Ouvrir le fichier et exporter en PDF (Fichier → Exporter → PDF)"
Write-Host ""

# Créer un HTML temporaire pour aperçu
Write-Host "📝 Génération d'un aperçu HTML..." -ForegroundColor Yellow

$htmlContent = @"
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rapport PFE - Employee Communication App</title>
    <style>
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            line-height: 1.6;
            max-width: 900px;
            margin: 40px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 40px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            border-radius: 8px;
        }
        h1 { color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
        h2 { color: #34495e; margin-top: 30px; }
        .info { background: #e8f4f8; padding: 15px; border-left: 4px solid #3498db; margin: 20px 0; }
        .success { background: #d4edda; padding: 15px; border-left: 4px solid #28a745; margin: 20px 0; }
        ul { list-style-type: none; padding-left: 0; }
        li { padding: 8px 0; }
        li:before { content: "✓ "; color: #28a745; font-weight: bold; }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background: #3498db;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px 5px;
        }
        .btn:hover { background: #2980b9; }
    </style>
</head>
<body>
    <div class="container">
        <h1>📄 Rapport PFE - Application de Communication Employés</h1>
        
        <div class="success">
            <strong>✅ Rapport Markdown complet généré!</strong><br>
            Fichier: <code>$inputFile</code><br>
            Lignes: $(Get-Content $inputFile | Measure-Object -Line | Select-Object -ExpandProperty Lines)<br>
            Taille: $([math]::Round((Get-Item $inputFile).Length / 1KB, 2)) KB
        </div>

        <h2>📋 Contenu du rapport</h2>
        <ul>
            <li>Introduction Générale</li>
            <li>Chapitre 1 : Analyse et Spécification des Besoins</li>
            <li>Chapitre 2 : Conception du Système</li>
            <li>Chapitre 3 : Réalisation et Implémentation</li>
            <li>Conclusion Générale</li>
            <li>Bibliographie (40 références)</li>
            <li>Annexes complètes</li>
        </ul>

        <h2>🔧 Comment générer le PDF</h2>
        
        <div class="info">
            <strong>Méthode 1 : Installer Pandoc (Recommandé)</strong><br>
            <code>choco install pandoc miktex</code><br>
            Puis relancer ce script.
        </div>

        <div class="info">
            <strong>Méthode 2 : Extension VS Code</strong><br>
            1. Installer l'extension "Markdown PDF" (yzane.markdown-pdf)<br>
            2. Ouvrir $inputFile dans VS Code<br>
            3. Ctrl+Shift+P → "Markdown PDF: Export (pdf)"
        </div>

        <div class="info">
            <strong>Méthode 3 : Convertisseur en ligne</strong><br>
            Uploader le fichier sur:<br>
            <a href="https://www.markdowntopdf.com/" target="_blank" class="btn">MarkdownToPDF.com</a>
            <a href="https://md2pdf.netlify.app/" target="_blank" class="btn">MD2PDF</a>
        </div>

        <h2>📊 Informations projet</h2>
        <ul>
            <li>Entreprise: Dräxlmaier Tunisie</li>
            <li>Projet: Application Mobile de Communication Employés</li>
            <li>Technologies: Flutter, Node.js, MongoDB, Socket.IO</li>
            <li>Date: Janvier 2026</li>
        </ul>

        <p style="text-align: center; margin-top: 40px; color: #7f8c8d;">
            <strong>Le fichier Markdown est prêt pour conversion!</strong>
        </p>
    </div>
</body>
</html>
"@

$htmlFile = "rapport_apercu.html"
$htmlContent | Out-File -FilePath $htmlFile -Encoding UTF8

Write-Host "✅ Aperçu HTML créé: $htmlFile" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Ouverture de l'aperçu dans le navigateur..." -ForegroundColor Cyan
Start-Process $htmlFile

Write-Host ""
Write-Host "=== Resume ===" -ForegroundColor Green
Write-Host "OK Rapport Markdown complet: $inputFile"
Write-Host "OK Apercu HTML: $htmlFile"
Write-Host ""
Write-Host "Pour generer le PDF, installez Pandoc ou utilisez une des methodes ci-dessus."
Write-Host ""
