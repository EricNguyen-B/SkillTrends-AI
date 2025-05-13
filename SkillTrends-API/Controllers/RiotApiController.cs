using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using SkillTrendsApi.Services;

namespace SkillTrendsApi.Controllers
{
    [ApiController]
    [Route("api/riot")]
    public class RiotApiController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly RiotApiServices _riotApiServices;
        //var apiKey = configuration["ApiKeys:_riotApiKey"]
        //private readonly string _riotApiKey = apikey;

        public RiotApiController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        // Endpoint to get account details by Riot ID (gameName and tagLine)
        [HttpGet("account/{gameName}/{tagLine}")]
        public async Task<IActionResult> GetAccountByRiotId(string gameName, string tagLine)
        {
            var _riotPid = _riotApiServices.GetPid();
            // Construct the URL with the provided gameName and tagLine
            string url = $"https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}";

            // Add your API key to the headers

            _httpClient.DefaultRequestHeaders.Add("X-Riot-Token", _riotApiKey);

            try
            {
                // Send the request
                var response = await _httpClient.GetAsync(url);
                var content = await response.Content.ReadAsStringAsync();

                // Check if the request was successful
                if (!response.IsSuccessStatusCode)
                {
                    return StatusCode((int)response.StatusCode, content);
                }

                // Return the content from the API (account details)
                return Content(content, "application/json");
            }
            catch (Exception ex)
            {
                // Handle exceptions
                return StatusCode(500, $"An error occurred while calling the Riot API: {ex.Message}");
            }
        }
    }
}


