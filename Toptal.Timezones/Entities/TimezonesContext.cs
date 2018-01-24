using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Toptal.Timezones.Entities
{
    public partial class TimezonesContext : DbContext
    {
        public TimezonesContext(DbContextOptions options)
           : base(options)
        { }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<UserTimeZone> UserTimeZone { get; set; }

        // Unable to generate entity type for table 'dbo.UserTimeZoneAudit'. Please see the warning messages.

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    if (!optionsBuilder.IsConfigured)
        //    {
        //        #warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
        //        optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=Timezones;Trusted_Connection=True;");
        //    }
        //}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Email);

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .ValueGeneratedNever();
            });

            modelBuilder.Entity<UserTimeZone>(entity =>
            {
                entity.HasKey(e => new { e.UserEmail, e.TimeZoneName });

                entity.Property(e => e.UserEmail).HasMaxLength(100);

                entity.Property(e => e.TimeZoneName).HasMaxLength(100);

                entity.HasOne(d => d.UserEmailNavigation)
                    .WithMany(p => p.UserTimeZone)
                    .HasForeignKey(d => d.UserEmail)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserTimeZones_UserTimeZones");
            });
        }
    }
}
