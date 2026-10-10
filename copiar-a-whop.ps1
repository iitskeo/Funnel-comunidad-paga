# Copia el funnel al proyecto de Whop (TanStack Start) y lo deja listo para "whop apps deploy".
# Uso, desde esta carpeta:  .\copiar-a-whop.ps1            (destino por defecto: .\itskeo1)
#                           .\copiar-a-whop.ps1 -Destino K:\ruta\al\proyecto
param([string]$Destino = (Join-Path $PSScriptRoot 'itskeo1'))

$ErrorActionPreference = 'Stop'
$origen = $PSScriptRoot
$public = Join-Path $Destino 'public'
$rutas = Join-Path $Destino 'src\routes'

if (-not (Test-Path $rutas)) { throw "No encuentro $rutas. Revisa la ruta del proyecto de Whop." }
New-Item -ItemType Directory -Force $public | Out-Null

# La landing va como inicio.html: la ruta "/" de TanStack redirige ahí.
Copy-Item (Join-Path $origen 'index.html') (Join-Path $public 'inicio.html') -Force
'gracias.html', 'bienvenido.html', 'tokens.css', 'estilos.css', 'config.js', 'app.js' | ForEach-Object {
  Copy-Item (Join-Path $origen $_) $public -Force
}
Copy-Item (Join-Path $origen 'whop\index.tsx') (Join-Path $rutas 'index.tsx') -Force

# Quitar el index.html suelto de pasos anteriores (TanStack no lo usa).
$suelto = Join-Path $Destino 'index.html'
if (Test-Path $suelto) { Remove-Item $suelto }

Write-Host "Listo. Ahora: cd $Destino ; whop apps deploy"
