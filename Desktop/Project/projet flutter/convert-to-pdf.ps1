# Script simple de conversion Markdown vers PDF
# Auteur: Assistant IA
# Date: 20 Janvier 2026

$mdFile = "rapportPFE.md"
$pdfFile = "Rapport_PFE_Draxlmaier_2026.pdf"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Conversion Rapport PFE en PDF" -ForegroundColor Cyan  
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verifier l'existence du fichier
if (Test-Path $mdFile) {
    $fileSize = [math]::Round((Get-Item $mdFile).Length / 1KB, 2)
    $lineCount = (Get-Content $mdFile | Measure-Object -Line).Lines
    
    Write-Host "Fichier trouve: $mdFile" -ForegroundColor Green
    Write-Host "  - Taille: $fileSize KB" -ForegroundColor White
    Write-Host "  - Lignes: $lineCount" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "ERREUR: Fichier $mdFile introuvable!" -ForegroundColor Red
    exit 1
}

# Verifier Pandoc
Write-Host "Verification de Pandoc..." -ForegroundColor Yellow
$pandocInstalled = Get-Command pandoc -ErrorAction SilentlyContinue

if ($pandocInstalled) {
    Write-Host "Pandoc est installe!" -ForegroundColor Green
    Write-Host "Generation du PDF en cours..." -ForegroundColor Yellow
    Write-Host ""
    
    # Generer le PDF
    pandoc $mdFile -o $pdfFile `
        --pdf-engine=xelatex `
        -V geometry:margin=2.5cm `
        -V fontsize=11pt `
        -V documentclass=report `
        -V lang=fr `
        --toc `
        --number-sections
    
    if (Test-Path $pdfFile) {
        $pdfSize = [math]::Round((Get-Item $pdfFile).Length / 1KB, 2)
        Write-Host "SUCCESS: PDF genere avec succes!" -ForegroundColor Green
        Write-Host "  - Fichier: $pdfFile" -ForegroundColor White
        Write-Host "  - Taille: $pdfSize KB" -ForegroundColor White
        Write-Host ""
        Write-Host "Ouverture du PDF..." -ForegroundColor Cyan
        Start-Process $pdfFile
    } else {
        Write-Host "ERREUR: La generation a echoue." -ForegroundColor Red
    }
} else {
    Write-Host "Pandoc n'est pas installe." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "SOLUTIONS POSSIBLES:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. Installer Pandoc + MiKTeX:" -ForegroundColor White
    Write-Host "   choco install pandoc miktex" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Extension VS Code 'Markdown PDF':" -ForegroundColor White
    Write-Host "   - Installer l'extension (yzane.markdown-pdf)" -ForegroundColor Gray
    Write-Host "   - Ouvrir le fichier MD" -ForegroundColor Gray
    Write-Host "   - Ctrl+Shift+P -> Markdown PDF: Export" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. Convertisseur en ligne:" -ForegroundColor White
    Write-Host "   https://www.markdowntopdf.com/" -ForegroundColor Gray
    Write-Host ""
    Write-Host "4. Typora (editeur Markdown):" -ForegroundColor White  
    Write-Host "   https://typora.io/ -> Fichier -> Exporter -> PDF" -ForegroundColor Gray
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Script termine." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
