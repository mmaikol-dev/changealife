<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\SupportCase;
use Illuminate\Database\Seeder;

class SiteContentSeeder extends Seeder
{
    /**
     * Seed the public site content captured in the site content audit.
     */
    public function run(): void
    {
        $this->seedCases();
        $this->seedBlogPosts();
    }

    private function seedCases(): void
    {
        $cases = [
            [
                'title' => 'School Fees Support',
                'slug' => 'school-fees-support',
                'description' => 'Susan Musonge is a single mother in Kakamega who needs KSh 10,000 to clear outstanding school fees so her children can sit their end-of-term examinations without interruption.',
                'location' => 'Kakamega',
                'county' => 'Kakamega',
                'amount_needed' => 10000,
                'amount_raised' => 6500,
                'status' => 'open',
                'gender' => 'Female',
                'age_range' => '26-40',
                'categories' => ['Education Support'],
                'tags' => ['School Fees'],
                'featured' => true,
                'posted_at' => now()->subMonths(2),
            ],
            [
                'title' => 'Education Support to Join Technical School',
                'slug' => 'education-support-to-join-technical-school',
                'description' => 'A young woman in Siaya has been admitted to a technical training institute but is missing KSh 23,000 in tuition and registration fees that would let her start the course.',
                'location' => 'Siaya',
                'county' => 'Siaya',
                'amount_needed' => 23000,
                'amount_raised' => 12000,
                'status' => 'open',
                'gender' => 'Female',
                'age_range' => '18-25',
                'categories' => ['Education Support'],
                'tags' => ['School Fees'],
                'featured' => true,
                'posted_at' => now()->subMonths(7),
            ],
            [
                'title' => 'School Fees Support for Single Mother',
                'slug' => 'school-fees-support-for-single-mother',
                'description' => 'A single mother in Trans-Nzoia is carrying KSh 55,500 in school fees arrears for her two children. Clearing the balance would allow both children to return to class without the threat of being sent home.',
                'location' => 'Trans-Nzoia',
                'county' => 'Trans-Nzoia',
                'amount_needed' => 55500,
                'amount_raised' => 21000,
                'status' => 'open',
                'gender' => 'Female',
                'age_range' => '26-40',
                'categories' => ['Education Support'],
                'tags' => ['School Fees'],
                'featured' => true,
                'posted_at' => now()->subMonths(7),
            ],
            [
                'title' => 'Small Business Support',
                'slug' => 'small-business-support-kajiado-male',
                'description' => 'A resident of Kajiado is seeking KSh 5,000 to restock a small kiosk that was disrupted after a period of illness. The restock would allow the business to resume serving the local community.',
                'location' => 'Kajiado',
                'county' => 'Kajiado',
                'amount_needed' => 5000,
                'amount_raised' => 2000,
                'status' => 'open',
                'gender' => 'Male',
                'age_range' => '41-60',
                'categories' => ['Education Support', 'Livelihood Support'],
                'tags' => ['Small Business Support'],
                'featured' => false,
                'posted_at' => now()->subMonths(4),
            ],
            [
                'title' => 'Small Business Support',
                'slug' => 'small-business-support-kajiado-female',
                'description' => 'A woman trader in Kajiado was supported with KSh 5,000 to restock her produce stall. This case has been fully funded and is now closed.',
                'location' => 'Kajiado',
                'county' => 'Kajiado',
                'amount_needed' => 5000,
                'amount_raised' => 5000,
                'status' => 'closed',
                'gender' => 'Female',
                'age_range' => '41-60',
                'categories' => ['Livelihood Support'],
                'tags' => ['Small Business Support'],
                'featured' => false,
                'posted_at' => now()->subMonths(9),
            ],
            [
                'title' => 'Support for Education and Food',
                'slug' => 'support-for-education-and-food',
                'description' => 'A family in Narok is receiving combined education and food support worth KSh 7,000 so that children can stay in school while the household rebuilds its food security.',
                'location' => 'Narok',
                'county' => 'Narok',
                'amount_needed' => 7000,
                'amount_raised' => 3500,
                'status' => 'ongoing',
                'gender' => 'Female',
                'age_range' => '26-40',
                'categories' => ['Education Support', 'Food'],
                'tags' => ['Food', 'School Fees'],
                'featured' => false,
                'posted_at' => now()->subMonths(1),
            ],
        ];

        foreach ($cases as $case) {
            SupportCase::query()->updateOrCreate(
                ['slug' => $case['slug']],
                $case,
            );
        }
    }

    private function seedBlogPosts(): void
    {
        $posts = [
            [
                'title' => "Why Digital Literacy Is Key to Africa's Future",
                'slug' => 'why-digital-literacy-is-key-to-africas-future',
                'excerpt' => "Africa has the world's youngest population, yet millions remain excluded from the digital economy due to limited access to technology and digital skills.",
                'body' => <<<'BODY'
Africa has the world's youngest population, yet millions remain excluded from the digital economy due to limited access to technology and digital skills.

When a young person in a rural ward cannot send an application online, read a circular from a county office, or compare prices for inputs at a market three wards away, the digital divide stops being an abstract idea. It becomes a tax paid in lost time, lost income and lost opportunity.

Digital literacy is not about teaching people to use devices. It is about giving people the confidence to find information, protect themselves online, and take part in the economy that is forming around them. Basic computer skills, online safety and digital communication are the three foundations we build on.

That is why our Digital Literacy programme concentrates on young scholars, youth and women in marginalised communities. The goal is simple: equip people to use technology for education, for job opportunities, and for social engagement.

Every person who can navigate the digital world with confidence is a person who can advocate for their family, grow a business, and help their community do the same. That is how a divide closes.
BODY,
                'author' => 'Namu',
                'category' => 'Digital Literacy',
                'tag' => 'Education',
                'cover_image' => '/images/cali/digital-literacy.jpg',
                'published_at' => now()->setDate(2024, 5, 2),
            ],
            [
                'title' => 'Creating Schools That Work for Every Child: Why Disability Inclusion Cannot Wait in Kenya',
                'slug' => 'creating-schools-that-work-for-every-child',
                'excerpt' => 'Education should open doors for every child, yet thousands of learners with disabilities across Kenya and Africa continue to face barriers that have little to do with their abilities.',
                'body' => <<<'BODY'
Education should open doors for every child, yet thousands of learners with disabilities across Kenya and Africa continue to face barriers that have little to do with their abilities.

A child who cannot reach a classroom because there is no ramp is not failing an exam. A child who cannot read a chalkboard because there is no assistive support is not lacking intelligence. These are failures of the environments we build, not of the children in them.

Inclusion in schools means ramps at entrances, accessible washrooms, braille materials where they are needed, and assistive devices within reach. It also means changing attitudes in the school community, because stigma can close a door as firmly as a flight of stairs.

We have seen what happens when these supports arrive. Optical check-ups and eyeglasses for visually impaired children from humble backgrounds have helped learners follow lessons again. A young boy once kept hidden by his family because of stigma now attends regular physiotherapy at a local Level 3 hospital, and his family has stopped hiding him.

These are small, practical changes. They are also the difference between a child being counted and a child being left out. Disability inclusion in Kenyan schools cannot wait, and it does not require anyone to be extraordinary to start.
BODY,
                'author' => 'Namu',
                'category' => 'Disability Inclusion',
                'tag' => 'Disability Inclusion',
                'cover_image' => '/images/cali/disability-inclusion.jpg',
                'published_at' => now()->setDate(2024, 7, 2),
            ],
            [
                'title' => 'Beyond Charity: Why Empowering Communities Creates Lasting Change in Kenya',
                'slug' => 'beyond-charity-why-empowering-communities-creates-lasting-change',
                'excerpt' => 'Giving is important, but lasting transformation happens when people are equipped with the knowledge, skills, opportunities, and confidence to change their own lives.',
                'body' => <<<'BODY'
Giving is important, but lasting transformation happens when people are equipped with the knowledge, skills, opportunities, and confidence to change their own lives.

There is a difference between supporting a family through a hard season and giving that family the tools to stop being so exposed to hard seasons in the first time. Both matter. Only one of them changes the long term.

We believe in inclusive programmes that empower individuals, foster holistic wellness, and open equitable opportunities regardless of background or circumstance. That belief shapes how we work: we do not treat communities as recipients, we treat them as partners in the design of what comes next.

Practically, this looks like a woman's cooperative that can account for its own funds, a parent group that knows how to demand an accessible classroom, or a young person with the digital skills to apply for work beyond their ward.

These outcomes do not arrive from a single handout. They arrive from repeated, patient work that leaves capacity behind when we go. That is the standard we hold ourselves to.
BODY,
                'author' => 'Namu',
                'category' => 'Community Impact',
                'tag' => 'Women Empowerment',
                'cover_image' => '/images/cali/who-we-are.jpg',
                'published_at' => now()->setDate(2024, 5, 2),
            ],
        ];

        foreach ($posts as $post) {
            BlogPost::query()->updateOrCreate(
                ['slug' => $post['slug']],
                $post,
            );
        }
    }
}
