using Microsoft.EntityFrameworkCore;
using Mobile_Banking_V1.Models;

namespace Mobile_Banking_V1.Data
{
    public class BankingDbContext : DbContext
    {
        public BankingDbContext(DbContextOptions<BankingDbContext> options) : base(options)
        {
        }

        public DbSet<UserDetailsS> UserDetails { get; set; }
        public DbSet<UserAccountDetailsS> UserAccountDetails { get; set; }
        public DbSet<UserLoginDetailsS> UserLoginDetails { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserAccountDetailsS>()
                .HasKey(u => new { u.AccountID, u.PhoneNumber });
        }

    }
}
