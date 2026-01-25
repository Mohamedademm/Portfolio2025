# Script de personnalisation automatique du rapport PFE
# Auteur: GitHub Copilot
# Date: 20 Janvier 2026

Write-Host "`n" -NoNewline
Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                        ║" -ForegroundColor Cyan
Write-Host "║     PERSONNALISATION DU RAPPORT PFE                   ║" -ForegroundColor Cyan -NoNewline
Write-Host "║" -ForegroundColor Cyan
Write-Host "║     Application Mobile Draxlmaier                      ║" -ForegroundColor Cyan -NoNewline
Write-Host "║" -ForegroundColor Cyan
Write-Host "║                                                        ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

$rapportFile = "rapportPFE.md"

# Verifier que le fichier existe
if (-not (Test-Path $rapportFile)) {
    Write-Host "ERREUR: Le fichier $rapportFile est introuvable!" -ForegroundColor Red
    exit 1
}

Write-Host "Fichier trouve: $rapportFile" -ForegroundColor Green
Write-Host ""

# Creer une sauvegarde
$backupFile = "rapportPFE_BACKUP_$(Get-Date -Format 'yyyyMMdd_HHmmss').md"
Copy-Item $rapportFile $backupFile
Write-Host "Sauvegarde creee: $backupFile" -ForegroundColor Yellow
Write-Host ""

# Collecter les informations
Write-Host "Veuillez entrer les informations suivantes:" -ForegroundColor Cyan
Write-Host "(Appuyez sur Entree pour passer si vous voulez garder les placeholders)" -ForegroundColor Gray
Write-Host ""

# Nom de l'etudiant
Write-Host "Votre nom complet: " -ForegroundColor Yellow -NoNewline
$nomEtudiant = Read-Host
if ([string]::IsNullOrWhiteSpace($nomEtudiant)) {
    $nomEtudiant = "[Votre nom]"
    Write-Host "  -> Garde le placeholder" -ForegroundColor Gray
}

# Encadrant academique
Write-Host "Nom de l'encadrant academique: " -ForegroundColor Yellow -NoNewline
$encadrantAcad = Read-Host
if ([string]::IsNullOrWhiteSpace($encadrantAcad)) {
    $encadrantAcad = "[Nom de l'encadreur academique]"
    Write-Host "  -> Garde le placeholder" -ForegroundColor Gray
}

# Encadrant entreprise
Write-Host "Nom de l'encadrant entreprise (Draxlmaier): " -ForegroundColor Yellow -NoNewline
$encadrantEntr = Read-Host
if ([string]::IsNullOrWhiteSpace($encadrantEntr)) {
    $encadrantEntr = "[Nom Encadrant Entreprise]"
    Write-Host "  -> Garde le placeholder" -ForegroundColor Gray
}

# Etablissement
Write-Host "Nom de votre ecole/universite: " -ForegroundColor Yellow -NoNewline
$etablissement = Read-Host
if ([string]::IsNullOrWhiteSpace($etablissement)) {
    $etablissement = "[Nom de votre ecole/universite]"
    Write-Host "  -> Garde le placeholder" -ForegroundColor Gray
}

# Date de soutenance
Write-Host "Date de soutenance (ex: 15 Fevrier 2026): " -ForegroundColor Yellow -NoNewline
$dateSoutenance = Read-Host
if ([string]::IsNullOrWhiteSpace($dateSoutenance)) {
    $dateSoutenance = "[A completer]"
    Write-Host "  -> Garde le placeholder" -ForegroundColor Gray
}

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║  RECAPITULATIF DES MODIFICATIONS                       ║" -ForegroundColor Green -NoNewline
Write-Host "║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host "Etudiant          : $nomEtudiant" -ForegroundColor White
Write-Host "Encadrant acad.   : $encadrantAcad" -ForegroundColor White
Write-Host "Encadrant entr.   : $encadrantEntr" -ForegroundColor White
Write-Host "Etablissement     : $etablissement" -ForegroundColor White
Write-Host "Date soutenance   : $dateSoutenance" -ForegroundColor White
Write-Host ""

Write-Host "Voulez-vous appliquer ces modifications? (O/N): " -ForegroundColor Yellow -NoNewline
$confirmation = Read-Host

if ($confirmation -ne "O" -and $confirmation -ne "o") {
    Write-Host "Operation annulee." -ForegroundColor Red
    Remove-Item $backupFile
    exit 0
}

Write-Host ""
Write-Host "Application des modifications..." -ForegroundColor Cyan

# Lire le contenu du fichier
$content = Get-Content $rapportFile -Raw -Encoding UTF8

# Compteurs de remplacements
$count = @{
    nom = 0
    encadAcad = 0
    encadEntr = 0
    etab = 0
    date = 0
}

# Remplacer les placeholders
if ($nomEtudiant -ne "[Votre nom]") {
    $newContent = $content -replace '\[Votre nom\]', $nomEtudiant
    $count.nom = ([regex]::Matches($content, '\[Votre nom\]')).Count
    $content = $newContent
}

if ($encadrantAcad -ne "[Nom de l'encadreur academique]") {
    $newContent = $content -replace '\[Nom de l''encadreur acad[ée]mique\]', $encadrantAcad
    $count.encadAcad = ([regex]::Matches($content, '\[Nom de l''encadreur acad')).Count
    $content = $newContent
}

if ($encadrantEntr -ne "[Nom Encadrant Entreprise]") {
    $newContent = $content -replace '\[Nom Encadrant Entreprise\]', $encadrantEntr
    $count.encadEntr = ([regex]::Matches($content, '\[Nom Encadrant Entreprise\]')).Count
    $content = $newContent
}

if ($etablissement -ne "[Nom de votre ecole/universite]") {
    $newContent = $content -replace '\[Nom de votre [ée]cole/universit[ée]\]', $etablissement
    $count.etab = ([regex]::Matches($content, '\[Nom de votre')).Count
    $content = $newContent
}

if ($dateSoutenance -ne "[A completer]") {
    $newContent = $content -replace '\[À compléter\]', $dateSoutenance
    $newContent = $newContent -replace '\[A compl[ée]ter\]', $dateSoutenance
    $count.date = ([regex]::Matches($content, '\[À compléter\]|À compl')).Count
    $content = $newContent
}

# Sauvegarder le fichier modifie
$content | Out-File -FilePath $rapportFile -Encoding UTF8 -NoNewline

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║  MODIFICATIONS APPLIQUEES AVEC SUCCES!                 ║" -ForegroundColor Green -NoNewline
Write-Host "║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "Statistiques:" -ForegroundColor Cyan
Write-Host "  - Nom etudiant      : $($count.nom) remplacements" -ForegroundColor White
Write-Host "  - Encadrant acad.   : $($count.encadAcad) remplacements" -ForegroundColor White
Write-Host "  - Encadrant entr.   : $($count.encadEntr) remplacements" -ForegroundColor White
Write-Host "  - Etablissement     : $($count.etab) remplacements" -ForegroundColor White
Write-Host "  - Date soutenance   : $($count.date) remplacements" -ForegroundColor White
Write-Host ""
Write-Host "Fichier personnalise: $rapportFile" -ForegroundColor Green
Write-Host "Sauvegarde originale: $backupFile" -ForegroundColor Yellow
Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  PROCHAINES ETAPES                                     ║" -ForegroundColor Cyan -NoNewline
Write-Host "║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Verifier le fichier personnalise: rapportPFE.md" -ForegroundColor White
Write-Host "2. Generer le PDF:" -ForegroundColor White
Write-Host "   -> Methode simple: Extension VS Code 'Markdown PDF'" -ForegroundColor Gray
Write-Host "   -> Methode pro: .\convert-to-pdf.ps1" -ForegroundColor Gray
Write-Host "3. Consulter GUIDE_GENERATION_PDF.md pour plus de details" -ForegroundColor White
Write-Host ""
Write-Host "Appuyez sur une touche pour ouvrir le rapport..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Ouvrir le fichier dans VS Code
code $rapportFile

Write-Host ""
Write-Host "Rapport ouvert dans VS Code!" -ForegroundColor Green
Write-Host "Bonne chance pour votre soutenance! " -ForegroundColor Cyan -NoNewline
Write-Host "🎓🚀" -ForegroundColor Yellow
Write-Host ""
