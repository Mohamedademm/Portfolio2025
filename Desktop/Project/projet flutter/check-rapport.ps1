# Script de verification rapide du rapport PFE

$rapportFile = "rapportPFE.md"

if (-not (Test-Path $rapportFile)) {
    Write-Host "ERREUR: Fichier introuvable!" -ForegroundColor Red
    exit 1
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   VERIFICATION RAPPORT PFE" -ForegroundColor Cyan  
Write-Host "========================================`n" -ForegroundColor Cyan

$content = Get-Content $rapportFile -Raw -Encoding UTF8
$fileInfo = Get-Item $rapportFile
$lineCount = (Get-Content $rapportFile | Measure-Object -Line).Lines
$wordCount = ($content -split '\s+' | Where-Object {$_ -ne ''}).Count

# Statistiques
Write-Host "STATISTIQUES GENERALES" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Gray
Write-Host ("Taille        : {0:N2} KB" -f ($fileInfo.Length/1KB))
Write-Host ("Lignes        : {0}" -f $lineCount)
Write-Host ("Mots          : {0}" -f $wordCount)
Write-Host ("Pages (est.)  : ~{0}-{1} pages PDF" -f [math]::Ceiling($lineCount/30), [math]::Ceiling($lineCount/25))
Write-Host ""

# Structure
Write-Host "STRUCTURE DU DOCUMENT" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Gray
$introCount = ([regex]::Matches($content, '## Introduction')).Count
$chapitreCount = ([regex]::Matches($content, '## Chapitre \d')).Count
$conclusionCount = ([regex]::Matches($content, '## Conclusion')).Count
$biblioCount = ([regex]::Matches($content, '## Bibliographie')).Count

Write-Host ("Introduction    : {0}" -f $introCount) -ForegroundColor $(if($introCount -gt 0){"Green"}else{"Red"})
Write-Host ("Chapitres       : {0}" -f $chapitreCount) -ForegroundColor $(if($chapitreCount -ge 3){"Green"}else{"Yellow"})
Write-Host ("Conclusion      : {0}" -f $conclusionCount) -ForegroundColor $(if($conclusionCount -gt 0){"Green"}else{"Red"})
Write-Host ("Bibliographie   : {0}" -f $biblioCount) -ForegroundColor $(if($biblioCount -gt 0){"Green"}else{"Red"})
Write-Host ""

# Contenu technique
Write-Host "CONTENU TECHNIQUE" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Gray
$diagrammesUML = ([regex]::Matches($content, '```plantuml')).Count
$diagrammesMermaid = ([regex]::Matches($content, '```mermaid')).Count
$totalDiagrammes = $diagrammesUML + $diagrammesMermaid

$codeJS = ([regex]::Matches($content, '```javascript')).Count
$codeDart = ([regex]::Matches($content, '```dart')).Count
$totalCode = $codeJS + $codeDart

$references = ([regex]::Matches($content, '^\d+\.\s+\*\*', [System.Text.RegularExpressions.RegexOptions]::Multiline)).Count

Write-Host ("Diagrammes      : {0} (UML: {1}, Mermaid: {2})" -f $totalDiagrammes, $diagrammesUML, $diagrammesMermaid)
Write-Host ("Code extraits   : {0} (JS: {1}, Dart: {2})" -f $totalCode, $codeJS, $codeDart)
Write-Host ("References      : {0}" -f $references)
Write-Host ""

# Placeholders
Write-Host "PLACEHOLDERS A COMPLETER" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Gray
$placeNom = ([regex]::Matches($content, '\[Votre nom\]')).Count
$placeEncadr = ([regex]::Matches($content, '\[Nom de l''encadreur')).Count
$placeEntr = ([regex]::Matches($content, '\[Nom Encadrant Entreprise\]')).Count
$totalPlace = $placeNom + $placeEncadr + $placeEntr

Write-Host ("[Votre nom]               : {0}" -f $placeNom) -ForegroundColor $(if($placeNom -gt 0){"Yellow"}else{"Green"})
Write-Host ("[Encadrant academique]    : {0}" -f $placeEncadr) -ForegroundColor $(if($placeEncadr -gt 0){"Yellow"}else{"Green"})
Write-Host ("[Encadrant entreprise]    : {0}" -f $placeEntr) -ForegroundColor $(if($placeEntr -gt 0){"Yellow"}else{"Green"})
Write-Host ""

if ($totalPlace -gt 0) {
    Write-Host "CONSEIL: Utilisez .\personaliser-rapport.ps1 pour completer" -ForegroundColor Cyan
    Write-Host ""
}

# Score
Write-Host "SCORE DE QUALITE" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Gray

$score = 0
if ($introCount -gt 0) { $score += 5 }
if ($chapitreCount -ge 3) { $score += 15 }
if ($conclusionCount -gt 0) { $score += 5 }
if ($totalDiagrammes -ge 5) { $score += 15 }
if ($totalCode -ge 10) { $score += 15 }
if ($references -ge 30) { $score += 15 }
if ($totalPlace -eq 0) { $score += 30 }

$pourcentage = [math]::Round($score, 1)

if ($pourcentage -ge 90) {
    $evaluation = "EXCELLENT"
    $couleur = "Green"
} elseif ($pourcentage -ge 75) {
    $evaluation = "TRES BON"
    $couleur = "Green"
} elseif ($pourcentage -ge 60) {
    $evaluation = "BON"
    $couleur = "Yellow"
} else {
    $evaluation = "A AMELIORER"
    $couleur = "Red"
}

Write-Host ("Score           : {0}/100" -f $score)
Write-Host "Evaluation      : " -NoNewline
Write-Host $evaluation -ForegroundColor $couleur
Write-Host ""

# Resume
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "RESUME FINAL" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ("Fichier         : {0}" -f $rapportFile)
Write-Host ("Qualite         : {0} ({1}/100)" -f $evaluation, $score)
Write-Host ("Taille          : {0:N2} KB ({1} lignes)" -f ($fileInfo.Length/1KB), $lineCount)
Write-Host ""

if ($score -ge 85) {
    Write-Host "PRET POUR SOUTENANCE!" -ForegroundColor Green
} elseif ($score -ge 70) {
    Write-Host "Quelques ameliorations recommandees" -ForegroundColor Yellow
} else {
    Write-Host "Ameliorations necessaires avant soutenance" -ForegroundColor Red
}

Write-Host "`nPROCHAINES ETAPES:" -ForegroundColor Cyan
Write-Host "1. Personnaliser : .\personaliser-rapport.ps1"
Write-Host "2. Generer PDF   : .\convert-to-pdf.ps1"
Write-Host "3. Voir guide    : GUIDE_GENERATION_PDF.md"
Write-Host ""
