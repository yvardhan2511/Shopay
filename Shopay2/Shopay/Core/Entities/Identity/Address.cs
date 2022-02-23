using System.ComponentModel.DataAnnotations;

namespace Core.Entities.Identity
{
    public class Address
    {
        public int ID { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Street { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        [Required]
        public string ZipCode { get; set; }

        public string Country{get; set;}

        [Required]     //this prevents the fields from being nullable
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}