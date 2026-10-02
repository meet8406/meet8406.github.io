Add-Type -AssemblyName System.Drawing

$outputPath = Join-Path $PSScriptRoot '..\public\og-card.png'
$outputPath = [System.IO.Path]::GetFullPath($outputPath)
$bitmap = [System.Drawing.Bitmap]::new(1200, 630)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$graphics.Clear([System.Drawing.Color]::FromArgb(11, 12, 12))

$gridPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(19, 177, 194, 179), 1)
for ($x = 0; $x -le 1200; $x += 52) { $graphics.DrawLine($gridPen, $x, 0, $x, 630) }
for ($y = 0; $y -le 630; $y += 52) { $graphics.DrawLine($gridPen, 0, $y, 1200, $y) }

$glowBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(18, 197, 244, 103))
$graphics.FillEllipse($glowBrush, 770, -160, 520, 520)
$routePen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(145, 197, 244, 103), 2)
$routePoints = [System.Drawing.Point[]]@(
  [System.Drawing.Point]::new(750, 450), [System.Drawing.Point]::new(850, 450),
  [System.Drawing.Point]::new(925, 375), [System.Drawing.Point]::new(1035, 375),
  [System.Drawing.Point]::new(1100, 310), [System.Drawing.Point]::new(1200, 310)
)
$graphics.DrawLines($routePen, $routePoints)

$limeBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(197, 244, 103))
foreach ($point in @(@(850, 450), @(925, 375), @(1035, 375))) {
  $graphics.FillEllipse($limeBrush, $point[0] - 5, $point[1] - 5, 10, 10)
}

$eyebrowFont = [System.Drawing.Font]::new('Arial', 17, [System.Drawing.FontStyle]::Bold)
$titleFont = [System.Drawing.Font]::new('Arial', 91, [System.Drawing.FontStyle]::Bold)
$subtitleFont = [System.Drawing.Font]::new('Arial', 29, [System.Drawing.FontStyle]::Regular)
$footerFont = [System.Drawing.Font]::new('Arial', 15, [System.Drawing.FontStyle]::Bold)
$whiteBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(232, 233, 228))
$mutedBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(167, 175, 168))
$greenBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(130, 146, 122))
$graphics.DrawString('FULL-STACK SOFTWARE DEVELOPER', $eyebrowFont, $limeBrush, 88, 92)
$graphics.DrawString('Meet Shah', $titleFont, $whiteBrush, 82, 202)
$titleWidth = $graphics.MeasureString('Meet Shah', $titleFont).Width
$graphics.DrawString('.', $titleFont, $limeBrush, (82 + $titleWidth - 4), 202)
$graphics.DrawString('Building production systems from API to cloud.', $subtitleFont, $mutedBrush, 90, 350)
$graphics.DrawLine([System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(52, 59, 54), 1), 90, 474, 480, 474)
$graphics.DrawString('AHMEDABAD, INDIA  /  MEET8406.GITHUB.IO', $footerFont, $greenBrush, 90, 507)

$bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$graphics.Dispose()
$bitmap.Dispose()
Write-Output "Wrote $outputPath"
