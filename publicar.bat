@echo off
REM Publica la landing en Whop: baja la version nueva, la copia y hace el deploy.
cd /d K:\automatizacion\funnel
git pull origin claude/elegant-rubin-pa4aq4 < nul
if errorlevel 1 goto error
git log --oneline -1
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0copiar-a-whop.ps1" < nul
if errorlevel 1 goto error
cd /d K:\automatizacion\funnel\itskeo1
call whop apps deploy
goto fin
:error
echo.
echo Algo fallo arriba. No se hizo el deploy.
:fin
pause
