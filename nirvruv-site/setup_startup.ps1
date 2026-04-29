$WshShell = New-Object -comObject WScript.Shell
$ShortcutPath = "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup\StartNirvruvBackend.lnk"
$Shortcut = $WshShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = "d:\cursor nirvruv\nirvruv-site\backend\start.bat"
$Shortcut.WorkingDirectory = "d:\cursor nirvruv\nirvruv-site\backend"
$Shortcut.WindowStyle = 7
$Shortcut.Save()
Write-Host "Shortcut created at $ShortcutPath"
