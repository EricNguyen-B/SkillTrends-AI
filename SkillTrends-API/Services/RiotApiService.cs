using System;

public class RiotApiService
{
    private readonly string _apiKey;

    public RiotApiService(IOptions<ApiKeySettings> options)
    {
        _apiKey = options.Value.RiotApiService;
    }

    public string GetPid()
    {

    }
}
