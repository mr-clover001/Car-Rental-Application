using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace CarRentalAppBLL
{
   public class JwtService
    {

        public byte[] SecretKey { get; set; }

        public int TokenDuration { get; set; }
        private readonly IConfiguration config;

        public JwtService(IConfiguration _config)
        {
            config = _config;
            this.SecretKey = GenerateRandomKey(32); // Generate a 256-bit (32-byte) key
            this.TokenDuration = Int32.Parse(config.GetSection("jwtConfig").GetSection("Duration").Value);
        }

        public string GenerateToken(string userId, string firstName, string email, string role)
        {
            var key = new SymmetricSecurityKey(SecretKey);

            var signature = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var payload = new[]
            {
                new Claim("id", userId),
                new Claim("firstname", firstName),
                new Claim("email", email),
                new Claim("role", role),
            };

            var jwtToken = new JwtSecurityToken(
                issuer: "localhost",
                audience: "localhost",
                claims: payload,
                expires: DateTime.Now.AddMinutes(TokenDuration),
                signingCredentials: signature
            );

            return new JwtSecurityTokenHandler().WriteToken(jwtToken);
        }

        private byte[] GenerateRandomKey(int keySizeInBytes)
        {
            using (var rng = new RNGCryptoServiceProvider())
            {
                var key = new byte[keySizeInBytes];
                rng.GetBytes(key);
                return key;
            }
        }

    }
}
