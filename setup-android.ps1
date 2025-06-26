# Check if Android Studio is installed in the default location
$defaultAndroidStudioPath = "$env:LOCALAPPDATA\Android\Sdk"
$customAndroidStudioPath = "C:\Android\Sdk"

if (Test-Path $defaultAndroidStudioPath) {
    $sdkPath = $defaultAndroidStudioPath
} elseif (Test-Path $customAndroidStudioPath) {
    $sdkPath = $customAndroidStudioPath
} else {
    Write-Host "Android SDK not found in default locations. Please install Android Studio first."
    Write-Host "Download Android Studio from: https://developer.android.com/studio"
    Write-Host "After installation, run this script again."
    exit 1
}

# Set ANDROID_HOME for the current session
$env:ANDROID_HOME = $sdkPath
[System.Environment]::SetEnvironmentVariable("ANDROID_HOME", $sdkPath, "User")

# Add platform-tools to PATH
$platformToolsPath = Join-Path $sdkPath "platform-tools"
$currentPath = [System.Environment]::GetEnvironmentVariable("Path", "User")

if (-not $currentPath.Contains($platformToolsPath)) {
    $newPath = $currentPath + ";" + $platformToolsPath
    [System.Environment]::SetEnvironmentVariable("Path", $newPath, "User")
}

Write-Host "Android SDK environment variables have been set:"
Write-Host "ANDROID_HOME: $sdkPath"
Write-Host "platform-tools added to PATH: $platformToolsPath"
Write-Host ""
Write-Host "Please restart your terminal for the changes to take effect." 