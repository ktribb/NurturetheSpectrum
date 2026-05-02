export default function About() {
  return (
    <div className="container py-16 px-4 md:px-6 max-w-4xl mx-auto">
      <div className="space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-primary text-center mb-12">
          Our Mission
        </h1>

        <div className="prose prose-lg prose-slate max-w-none">
          <p className="text-xl text-muted-foreground leading-relaxed text-center mb-12 max-w-3xl mx-auto">
            Nurture the Spectrum was created with a single, focused goal: to make it easier for families in the Philadelphia area to find compassionate, qualified caregivers for children with autism and special needs.
          </p>

          <div className="bg-primary/5 p-8 md:p-12 rounded-2xl border border-primary/10 my-12">
            <h2 className="text-2xl font-bold text-primary mb-6">A Message from the Founder</h2>
            <div className="italic text-muted-foreground space-y-4 border-l-4 border-accent pl-6">
              <p className="font-medium text-foreground">[OWNER TO FILL IN PERSONAL STORY HERE]</p>
              <p>Placeholder text: Describe the journey of finding care for your own child, the challenges faced with existing directories, and the realization that a better, more compassionate system was needed for the local community.</p>
              <p>End with a warm welcome and a commitment to helping other families navigate this vulnerable time.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-primary mt-12 mb-4">Why We Built This</h2>
          <p>
            Finding the right caregiver is one of the most vulnerable moments in a parent's life. We know what it's like to scroll through endless generic directories, trying to decipher which providers truly understand the unique needs of a child on the spectrum.
          </p>
          <p>
            We built Nurture the Spectrum to be different. It's not a sterile, clinical database. It's designed to feel like a trusted referral from a friend—someone who knows the landscape, understands the challenges, and wants to help you find the absolute best support for your family.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-12 mb-4">Our Commitment</h2>
          <ul>
            <li><strong>Clarity:</strong> We require detailed profiles from our providers, so you know exactly what specializations and certifications they hold.</li>
            <li><strong>Compassion:</strong> Every aspect of our platform is designed with the understanding that navigating special needs care is overwhelming. We strive to make the process as peaceful as possible.</li>
            <li><strong>Community:</strong> We are exclusively focused on the Philadelphia metro area, ensuring our directory is relevant, local, and deeply rooted in our community.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
