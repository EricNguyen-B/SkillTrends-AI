var builder = WebApplication.CreateBuilder(args);

// Services
builder.Services.Configure<ApiKeySettings>(builder.Configuration.GetSection("ApiKeys"));
builder.Services.AddControllers();
builder.Services.AddHttpClient(); ; 

var app = builder.Build();

// Middleware
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();


app.Run();

