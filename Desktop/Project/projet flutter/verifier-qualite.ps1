# Script de verification de qualite du rapport PFE
# Date: 21 Janvier 2026

Write-Host "`n"
Write-Host "╔══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║          VERIFICATION QUALITE - RAPPORT PFE                  ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

$rapportFile = "rapportPFE.md"

if (-not (Test-Path $rapportFile)) {
    Write-Host "ERREUR: Fichier $rapportFile introuvable!" -ForegroundColor Red
    exit 1
}

# Lire le contenu
$content = Get-Content $rapportFile -Raw -Encoding UTF8
$lines = Get-Content $rapportFile

# Statistiques generales
Write-Host "STATISTIQUES GENERALES" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

$fileInfo = Get-Item $rapportFile
$lineCount = ($lines | Measure-Object -Line).Lines
$wordCount = ($content -split '\s+' | Where-Object {$_ -ne ''}).Count
$charCount = $content.Length

Write-Host "  Fichier       : $($fileInfo.Name)" -ForegroundColor White
Write-Host "  Taille        : $([math]::Round($fileInfo.Length/1KB,2)) KB" -ForegroundColor White
Write-Host "  Lignes        : $lineCount" -ForegroundColor White
Write-Host "  Mots          : $wordCount" -ForegroundColor White
Write-Host "  Caracteres    : $charCount" -ForegroundColor White
Write-Host "  Pages (est.)  : ~$([math]::Ceiling($lineCount/30))-$([math]::Ceiling($lineCount/25)) pages PDF" -ForegroundColor White
Write-Host ""

# Structure du document
Write-Host "STRUCTURE DU DOCUMENT" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

$introCount = ([regex]::Matches($content, '## Introduction')).Count
$chapitreCount = ([regex]::Matches($content, '## Chapitre \d')).Count
$conclusionCount = ([regex]::Matches($content, '## Conclusion')).Count
$biblioCount = ([regex]::Matches($content, '## Bibliographie')).Count
$annexeCount = ([regex]::Matches($content, '### Annexe [A-Z]')).Count

Write-Host "  Introduction     : $introCount" -ForegroundColor $(if($introCount -gt 0){"Green"}else{"Red"})
Write-Host "  Chapitres        : $chapitreCount" -ForegroundColor $(if($chapitreCount -ge 3){"Green"}else{"Yellow"})
Write-Host "  Conclusion       : $conclusionCount" -ForegroundColor $(if($conclusionCount -gt 0){"Green"}else{"Red"})
Write-Host "  Bibliographie    : $biblioCount" -ForegroundColor $(if($biblioCount -gt 0){"Green"}else{"Red"})
Write-Host "  Annexes          : $annexeCount" -ForegroundColor $(if($annexeCount -gt 0){"Green"}else{"Yellow"})
Write-Host ""

# Contenu technique
Write-Host "CONTENU TECHNIQUE" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

$diagrammesUML = ([regex]::Matches($content, '```plantuml')).Count
$diagrammesMermaid = ([regex]::Matches($content, '```mermaid')).Count
$totalDiagrammes = $diagrammesUML + $diagrammesMermaid

$codeJS = ([regex]::Matches($content, '```javascript')).Count
$codeDart = ([regex]::Matches($content, '```dart')).Count
$codeYAML = ([regex]::Matches($content, '```yaml')).Count
$codeBash = ([regex]::Matches($content, '```(bash|powershell)')).Count
$totalCode = $codeJS + $codeDart + $codeYAML + $codeBash

$tableaux = ([regex]::Matches($content, '^\|.*\|.*\|', [System.Text.RegularExpressions.RegexOptions]::Multiline)).Count / 3

Write-Host "  Diagrammes UML   : $diagrammesUML (PlantUML)" -ForegroundColor White
Write-Host "  Diagrammes Mermaid: $diagrammesMermaid" -ForegroundColor White
Write-Host "  Total diagrammes : $totalDiagrammes" -ForegroundColor $(if($totalDiagrammes -ge 5){"Green"}else{"Yellow"})
Write-Host ""
Write-Host "  Code JavaScript  : $codeJS extraits" -ForegroundColor White
Write-Host "  Code Dart/Flutter: $codeDart extraits" -ForegroundColor White
Write-Host "  Code YAML/Config : $codeYAML extraits" -ForegroundColor White
Write-Host "  Scripts Bash/PS  : $codeBash extraits" -ForegroundColor White
Write-Host "  Total code       : $totalCode extraits" -ForegroundColor $(if($totalCode -ge 10){"Green"}else{"Yellow"})
Write-Host ""
Write-Host "  Tableaux         : ~$([math]::Round($tableaux)) tableaux" -ForegroundColor $(if($tableaux -ge 8){"Green"}else{"Yellow"})
Write-Host ""

# Bibliographie
Write-Host "BIBLIOGRAPHIE" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

$references = ([regex]::Matches($content, '^\d+\.\s+\*\*', [System.Text.RegularExpressions.RegexOptions]::Multiline)).Count
$urls = ([regex]::Matches($content, 'https?://[^\s\)]+')).Count

Write-Host "  References       : $references" -ForegroundColor $(if($references -ge 30){"Green"}else{"Yellow"})
Write-Host "  URLs             : $urls liens web" -ForegroundColor White
Write-Host ""

# Verification des placeholders
Write-Host "VERIFICATION PLACEHOLDERS" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

$placeholders = @{
    "Nom etudiant" = ([regex]::Matches($content, '\[Votre nom\]')).Count
    "Encadrant acad" = ([regex]::Matches($content, '\[Nom de l''encadreur')).Count
    "Encadrant entr" = ([regex]::Matches($content, '\[Nom Encadrant Entreprise\]')).Count
    "Etablissement" = ([regex]::Matches($content, '\[Nom de votre')).Count
    "Date" = ([regex]::Matches($content, '\[À compléter\]|\[A compl')).Count
}

$totalPlaceholders = ($placeholders.Values | Measure-Object -Sum).Sum

foreach ($key in $placeholders.Keys) {
    $value = $placeholders[$key]
    $color = if ($value -gt 0) { "Yellow" } else { "Green" }
    $status = if ($value -gt 0) { "A COMPLETER" } else { "OK" }
    Write-Host "  $key : $value occurences - $status" -ForegroundColor $color
}

Write-Host ""
if ($totalPlaceholders -gt 0) {
    Write-Host "  CONSEIL: Utilisez .\personaliser-rapport.ps1 pour remplir automatiquement" -ForegroundColor Cyan
}
Write-Host ""

# Score de qualite
Write-Host "SCORE DE QUALITE" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

$score = 0
$maxScore = 100

# Structure (20 points)
if ($introCount -gt 0) { $score += 5 }
if ($chapitreCount -ge 3) { $score += 10 }
if ($conclusionCount -gt 0) { $score += 5 }

# Contenu technique (40 points)
if ($totalDiagrammes -ge 5) { $score += 10 }
if ($totalDiagrammes -ge 8) { $score += 5 }
if ($totalCode -ge 10) { $score += 15 }
if ($tableaux -ge 8) { $score += 10 }

# Bibliographie (20 points)
if ($references -ge 20) { $score += 10 }
if ($references -ge 30) { $score += 5 }
if ($references -ge 40) { $score += 5 }

# Completude (20 points)
if ($totalPlaceholders -eq 0) { $score += 20 }
elseif ($totalPlaceholders -le 5) { $score += 10 }

$pourcentage = [math]::Round(($score / $maxScore) * 100, 1)

Write-Host "  Score obtenu     : $score / $maxScore" -ForegroundColor White
Write-Host "  Pourcentage      : $pourcentage%" -ForegroundColor White

$couleurScore = "Red"
$evaluation = "A AMELIORER"

if ($pourcentage -ge 90) {
    $couleurScore = "Green"
    $evaluation = "EXCELLENT"
} elseif ($pourcentage -ge 75) {
    $couleurScore = "Green"
    $evaluation = "TRES BON"
} elseif ($pourcentage -ge 60) {
    $couleurScore = "Yellow"
    $evaluation = "BON"
}

Write-Host "  Evaluation       : " -NoNewline -ForegroundColor White
Write-Host "$evaluation" -ForegroundColor $couleurScore
Write-Host ""

# Recommandations
Write-Host "RECOMMANDATIONS" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

if ($totalPlaceholders -gt 0) {
    Write-Host "  Personnaliser les placeholders restants" -ForegroundColor Yellow
}

if ($totalDiagrammes -lt 5) {
    Write-Host "  Ajouter plus de diagrammes UML/Mermaid (minimum 5)" -ForegroundColor Yellow
}

if ($references -lt 30) {
    Write-Host "  Enrichir la bibliographie (minimum 30 references)" -ForegroundColor Yellow
}

if ($totalCode -lt 10) {
    Write-Host "  Ajouter plus d'extraits de code (minimum 10)" -ForegroundColor Yellow
}

if ($pourcentage -ge 85) {
    Write-Host "  Le rapport est de haute qualite!" -ForegroundColor Green
    Write-Host "  Pret pour generation PDF et impression" -ForegroundColor Green
}

Write-Host ""

# Resume final
Write-Host "╔══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                    RESUME FINAL                              ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "Rapport PFE : " -NoNewline -ForegroundColor White
Write-Host "$rapportFile" -ForegroundColor Green
Write-Host "Qualite     : " -NoNewline -ForegroundColor White
$percentSign = '%'
$scoreText = "$evaluation (" + $pourcentage + $percentSign + ")"  
Write-Host $scoreText -ForegroundColor $couleurScore
Write-Host "Taille      : " -NoNewline -ForegroundColor White
$tailleKB = [math]::Round($fileInfo.Length/1KB,2)
Write-Host "$tailleKB KB" -ForegroundColor Green
Write-Host "Contenu     : " -NoNewline -ForegroundColor White
Write-Host "$lineCount lignes, $wordCount mots" -ForegroundColor Green
Write-Host "Pages PDF   : " -NoNewline -ForegroundColor White
$minPages = [math]::Ceiling($lineCount/30)
$maxPages = [math]::Ceiling($lineCount/25)
Write-Host "~$minPages-$maxPages pages" -ForegroundColor Green
Write-Host ""

if ($pourcentage -ge 85) {
    Write-Host "✅ PRET POUR SOUTENANCE!" -ForegroundColor Green
} elseif ($pourcentage -ge 70) {
    Write-Host "⚠️  Quelques ameliorations recommandees" -ForegroundColor Yellow
} else {
    Write-Host "❌ Ameliorations necessaires avant soutenance" -ForegroundColor Red
}

Write-Host ""
Write-Host "Prochaines etapes:" -ForegroundColor Cyan
Write-Host '  1. Personnaliser (si besoin) : .\personaliser-rapport.ps1' -ForegroundColor White
Write-Host '  2. Generer le PDF : .\convert-to-pdf.ps1' -ForegroundColor White  
Write-Host '  3. Consulter le guide : GUIDE_GENERATION_PDF.md' -ForegroundColor White
Write-Host ""
