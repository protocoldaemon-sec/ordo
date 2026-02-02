# Manual SSE test to understand Fetch MCP Server behavior
$url = "https://fetch-mcp-server-production-666.up.railway.app/sse"

Write-Host "Connecting to SSE endpoint: $url" -ForegroundColor Cyan

try {
    # Create web request
    $request = [System.Net.HttpWebRequest]::Create($url)
    $request.Method = "GET"
    $request.Accept = "text/event-stream"
    $request.Headers.Add("Cache-Control", "no-cache")
    $request.Timeout = 30000
    
    Write-Host "Sending GET request..." -ForegroundColor Yellow
    
    # Get response
    $response = $request.GetResponse()
    $stream = $response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    
    Write-Host "Connected! Reading stream..." -ForegroundColor Green
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    
    $lineCount = 0
    $sessionId = $null
    
    # Read first 20 lines or until we get session
    while (-not $reader.EndOfStream -and $lineCount -lt 20) {
        $line = $reader.ReadLine()
        $lineCount++
        
        Write-Host "Line $lineCount : $line" -ForegroundColor White
        
        # Check for session ID
        if ($line -match "^data: (/messages\?session_id=.+)$") {
            $sessionId = $matches[1]
            Write-Host "`nSESSION FOUND: $sessionId" -ForegroundColor Green -BackgroundColor Black
            break
        }
    }
    
    if ($sessionId) {
        Write-Host "`nNow we should POST to: https://fetch-mcp-server-production-666.up.railway.app$sessionId" -ForegroundColor Cyan
        Write-Host "With body: {`"jsonrpc`":`"2.0`",`"method`":`"tools/list`",`"params`":{},`"id`":1}" -ForegroundColor Cyan
        Write-Host "`nKeeping stream open to listen for response..." -ForegroundColor Yellow
        
        # Keep reading for a bit longer to see if there are more messages
        $additionalLines = 0
        while (-not $reader.EndOfStream -and $additionalLines -lt 10) {
            $line = $reader.ReadLine()
            $additionalLines++
            Write-Host "Additional line $additionalLines : $line" -ForegroundColor Gray
            Start-Sleep -Milliseconds 100
        }
    }
    
    $reader.Close()
    $stream.Close()
    $response.Close()
    
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host "`nTest complete" -ForegroundColor Cyan
