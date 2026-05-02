import React from "react";
import { Link } from "wouter";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: React.ReactNode;
}

const AgencyCard = ({
  num,
  name,
  county,
  tags,
  certTags,
  children,
  phone,
  email,
  website,
  websiteLabel,
}: {
  num: number;
  name: string;
  county: string;
  tags: string[];
  certTags?: string[];
  children: React.ReactNode;
  phone?: string;
  email?: string;
  website: string;
  websiteLabel?: string;
}) => (
  <div className="bg-muted/40 border border-border rounded-xl p-6 my-6">
    <h2 className="text-lg font-bold text-primary mt-0 mb-1">
      {num}. {name}
    </h2>
    <p className="text-sm text-muted-foreground mb-3">📍 {county}</p>
    <div className="flex flex-wrap gap-1.5 mb-4">
      {tags.map((t) => (
        <span key={t} className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
          {t}
        </span>
      ))}
      {certTags?.map((t) => (
        <span key={t} className="inline-block bg-accent/15 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full">
          {t}
        </span>
      ))}
    </div>
    <div className="text-sm text-foreground/80 space-y-2">{children}</div>
    <p className="text-sm mt-3 text-muted-foreground">
      {phone && <><strong>Phone:</strong> {phone}&nbsp;&nbsp;</>}
      {email && <><strong>Email:</strong>{" "}<a href={`mailto:${email}`} className="text-primary hover:underline">{email}</a>&nbsp;&nbsp;</>}
      <strong>Website:</strong>{" "}
      <a href={website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
        {websiteLabel ?? website.replace(/^https?:\/\//, "")}
      </a>
    </p>
  </div>
);

const Post1Content = () => (
  <div className="prose prose-lg prose-slate max-w-none">
    {/* Intro box */}
    <div className="bg-primary/8 border-l-4 border-primary rounded-r-lg px-5 py-4 mb-8 not-prose">
      <p className="text-foreground/80 leading-relaxed text-base">
        Finding the right childcare for a child with autism or special needs takes more than a standard nanny search. You need caregivers with the right training, the right temperament, and experience working with kids who have unique sensory, behavioral, and communication needs. This guide cuts straight to the agencies serving the Philadelphia metro area that specialize in exactly that.
      </p>
    </div>

    <p>
      We've researched and compiled the top autism and special needs nanny agencies across <strong>Philadelphia, Delaware County, Bucks County, and Chester County</strong>. Each agency below has been selected for its specialization in autism and neurodivergent childcare, certified or trained staff, and track record serving Philadelphia-area families.
    </p>

    {/* Pro tip */}
    <div className="bg-accent/10 border-l-4 border-accent rounded-r-lg px-5 py-4 my-6 not-prose">
      <p className="text-sm text-foreground/80"><strong className="text-amber-700">Pro tip:</strong> When contacting any agency, ask specifically about ABA training, BCBA supervision, and experience with your child's specific diagnosis. The more specific you are, the better match you'll get.</p>
    </div>

    {/* Agency cards — rendered outside prose so we control styling */}
    <div className="not-prose">
      <AgencyCard
        num={1}
        name="The Nanny Share Network"
        county="Philadelphia, Montgomery, Delaware & Bucks Counties"
        tags={["Autism", "Cerebral Palsy", "Down Syndrome", "All Special Needs"]}
        phone="(215) 277-1300"
        website="https://thenannysharenetwork.com"
      >
        <p>One of the most comprehensive special needs nanny matching agencies in the Philadelphia metro area. The Nanny Share Network specializes specifically in pairing families who have children with disabilities with experienced, screened caregivers. They also serve New Jersey, Delaware, and New York.</p>
      </AgencyCard>

      <AgencyCard
        num={2}
        name="Balanced Babysitting"
        county="West Chester, PA (Chester County)"
        tags={["Autism", "ADHD", "Neurodivergent"]}
        certTags={["BCBA-Led", "ABA-Trained Staff"]}
        phone="(484) 401-9738"
        email="Info@balancedbabysitting.com"
        website="https://balancedbabysitting.com"
      >
        <p>A standout agency for families who want clinical-level expertise in their childcare. Balanced Babysitting is led by a Board Certified Behavior Analyst (BCBA) and places caregivers who are trained in ABA principles. They serve Chester, Delaware, Montgomery, Bucks, Berks, and Philadelphia Counties — making them one of the widest-reach specialty agencies in the area.</p>
      </AgencyCard>

      <AgencyCard
        num={3}
        name="Autism Babysitters"
        county="Serves Philadelphia Metro Area (National Platform)"
        tags={["Autism Spectrum Disorder"]}
        certTags={["ABA-Trained"]}
        phone="(888) 448-0430"
        website="https://autismbabysitters.com"
      >
        <p>A platform built exclusively for autism families. Every caregiver on Autism Babysitters is trained in ABA principles and evidence-based techniques for working with children on the spectrum. For Philadelphia families who want a caregiver with dedicated autism-specific training, this is one of the most targeted options available.</p>
      </AgencyCard>

      <AgencyCard
        num={4}
        name="Jovie of Philadelphia"
        county="Philadelphia City & Wayne, PA (Main Line)"
        tags={["Special Needs", "Autism", "Respite Care"]}
        certTags={["Trained & Screened Nannies"]}
        website="https://jovie.com/services/special-needs/"
        websiteLabel="jovie.com/services/special-needs"
      >
        <p>Jovie is a nationwide agency with a dedicated special needs and respite care division. Their Philadelphia presence covers both the city and the Main Line (Wayne, PA), making them a solid option for families in the western suburbs. All caregivers go through background checks and specialized training.</p>
      </AgencyCard>

      <AgencyCard
        num={5}
        name="Choose the Right Nanny (CTR Nanny)"
        county="Serves Philadelphia Metro (Nationwide Agency)"
        tags={["Autism", "ADHD", "Down Syndrome", "Cerebral Palsy", "G-Tube", "Hearing Impaired"]}
        website="https://ctrnanny.com"
        websiteLabel="ctrnanny.com/services/specialty-childcare/special-needs"
      >
        <p>CTR Nanny has one of the most detailed specialty childcare divisions we've seen. Their special needs placement team handles a wide range of diagnoses — including medically complex children requiring G-tube care — and typically places caregivers within 2 to 8 weeks. A strong choice for families with complex or multiple diagnoses.</p>
      </AgencyCard>

      <AgencyCard
        num={6}
        name="Helping Hands Family"
        county="Drexel Hill (Delaware County) & West Chester/Paoli (Chester County)"
        tags={["Autism", "ABA Therapy", "Early Intervention"]}
        certTags={["BHCOE-Accredited", "BCBA Staff"]}
        phone="(484) 965-9966"
        website="https://hhfamily.com"
      >
        <p>Helping Hands Family is BHCOE-accredited — a nationally recognized quality standard for ABA providers — and has physical locations in both Delaware and Chester Counties. They offer in-home and clinic-based ABA, and their staff includes BCBAs and RBTs who can deliver caregiver-adjacent services in your home.</p>
      </AgencyCard>

      <AgencyCard
        num={7}
        name="Beyond Autism Services"
        county="West Chester, Media & Havertown, PA (Chester & Delaware Counties)"
        tags={["Autism", "ABA Therapy", "Speech Therapy", "Occupational Therapy"]}
        certTags={["BCBA-Supervised", "BHCOE-Accredited"]}
        phone="(610) 572-5520"
        email="Admin@beyondautismservices.com"
        website="https://beyondautismservices.com"
      >
        <p>Beyond Autism Services offers a collaborative ABA + speech + occupational therapy model, making them ideal for families who need more than just behavioral support. With three suburban Philadelphia locations, they're highly accessible for Delaware and Chester County families. Their BCBAs and RBTs may also be available for in-home caregiver sessions.</p>
      </AgencyCard>

      <AgencyCard
        num={8}
        name="Aspire Child & Family Services"
        county="Huntingdon Valley, PA (Montgomery & Bucks Counties)"
        tags={["Autism", "ABA Therapy", "Behavioral Health"]}
        certTags={["BCBA Staff"]}
        phone="(267) 388-0670"
        email="info@AspireCFS.com"
        website="https://aspirecfs.com"
      >
        <p>Aspire CFS delivers in-home, school, and community-based ABA for children in Montgomery and Bucks Counties. They also offer diagnostic testing and counseling alongside childcare support, making them a good all-in-one option for families navigating the early stages of diagnosis and treatment.</p>
      </AgencyCard>

      <AgencyCard
        num={9}
        name="Acclaim Autism"
        county="West Chester & Philadelphia, PA"
        tags={["Autism", "ABA Therapy"]}
        certTags={["BCBA-Supervised"]}
        phone="(888) 805-8206"
        email="info@acclaimautism.com"
        website="https://acclaimautism.com"
      >
        <p>Acclaim Autism offers in-home and clinic-based ABA across Chester County, Delaware County, and the Main Line. Their community and school-based ABA model is a good fit for families who want caregiver support that extends beyond the home environment. They have a Philadelphia location as well.</p>
      </AgencyCard>

      <AgencyCard
        num={10}
        name="A-Team Home Care"
        county="Feasterville, PA (Philadelphia City & Bucks County)"
        tags={["Autism", "Pediatric Special Needs", "In-Home Support"]}
        certTags={["ABA-Informed Care"]}
        phone="(215) 490-9994"
        website="https://ateampa.com"
      >
        <p>A-Team Home Care focuses specifically on autism home care in the Philadelphia area, offering personalized care plans that combine behavioral and developmental support with skilled nursing when needed. They accept Medicaid and offer free in-home consultations — a big plus for families navigating insurance and waiver programs.</p>
      </AgencyCard>
    </div>

    {/* CTA box */}
    <div className="not-prose bg-primary rounded-xl px-8 py-10 my-10 text-center">
      <h2 className="text-xl font-bold text-white mb-3">Browse the Full Philadelphia Autism Childcare Directory</h2>
      <p className="text-primary-foreground/80 mb-5 text-sm leading-relaxed">
        NurturetheSpectrum.com lists 35+ vetted agencies and providers across Philadelphia, Delaware, Bucks, and Chester Counties — with filters by county, specialization, and certification.
      </p>
      <Link href="/directory" className="inline-block bg-accent text-white font-bold px-7 py-3 rounded-lg hover:bg-accent/90 transition-colors text-sm">
        Browse All Agencies →
      </Link>
    </div>

    <h2>What to Ask Before Hiring an Autism Nanny Agency</h2>
    <p>Once you've found a few agencies that look like a good fit, here are the questions that matter most:</p>
    <ul>
      <li><strong>Do your caregivers have ABA training?</strong> ABA (Applied Behavior Analysis) is the most evidence-based approach for autism. BCBA supervision is a strong indicator of quality.</li>
      <li><strong>Have your caregivers worked with a child who has my child's specific diagnosis?</strong> Autism presents very differently across individuals — experience with the spectrum in general is not the same as experience with your child's specific profile.</li>
      <li><strong>What is your caregiver screening process?</strong> Background checks, references, and in-person interviews should all be standard.</li>
      <li><strong>Do you offer a trial period or guarantee?</strong> Reputable agencies will give you a window to make sure the match is right before locking into a long-term arrangement.</li>
      <li><strong>Do you accept Medicaid or waiver programs?</strong> If your child has a Medicaid waiver (like the PA Consolidated Waiver), some agencies can bill directly — reducing your out-of-pocket cost significantly.</li>
    </ul>

    <h2>Frequently Asked Questions</h2>

    <p className="font-bold text-primary not-prose mt-5 mb-1">How much does an autism nanny cost in Philadelphia?</p>
    <p>Rates vary widely depending on the caregiver's certifications and the agency. In the Philadelphia metro area, expect to pay $25–$45/hour for an experienced special needs nanny or ABA-trained caregiver. Agency placement fees are typically separate and range from a few hundred to several thousand dollars depending on the placement type.</p>

    <p className="font-bold text-primary not-prose mt-5 mb-1">What certifications should I look for in an autism nanny?</p>
    <p>The most valuable credentials are BCBA (Board Certified Behavior Analyst), RBT (Registered Behavior Technician), and ABA certification. CPR certification and special education backgrounds are also strong indicators. For medically complex children, look for HHA (Home Health Aide) certification as well.</p>

    <p className="font-bold text-primary not-prose mt-5 mb-1">Does Pennsylvania Medicaid cover autism childcare?</p>
    <p>Pennsylvania's ODP (Office of Developmental Programs) Medicaid waivers — including the Consolidated Waiver and Community Living Waiver — can fund in-home supports for eligible individuals with autism and intellectual disabilities. Several agencies on this list are ODP-certified providers. Contact your county's ODP Supports Coordinator to determine eligibility.</p>

    <p className="font-bold text-primary not-prose mt-5 mb-1">Which counties does this directory cover?</p>
    <p>NurturetheSpectrum.com currently covers Philadelphia County, Delaware County, Bucks County, and Chester County. Many agencies listed also serve Montgomery County and surrounding areas.</p>

    <div className="not-prose border-t border-border mt-12 pt-6 text-xs text-muted-foreground">
      <p>NurturetheSpectrum.com is an independent directory. We do not receive compensation for agency listings unless noted as Featured or Verified. Always conduct your own due diligence before hiring a caregiver or agency. Information is updated periodically — contact agencies directly to confirm current availability and rates.</p>
      <p className="mt-2">© 2026 NurturetheSpectrum.com | Philadelphia, PA</p>
    </div>
  </div>
);

export const blogPosts: BlogPost[] = [
  {
    slug: "best-autism-nanny-agencies-philadelphia",
    title: "The Best Autism & Special Needs Nanny Agencies in Philadelphia (2026)",
    date: "May 2026",
    readTime: "7 min read",
    excerpt:
      "Looking for an autism or special needs nanny agency in Philadelphia? Here are the top agencies serving Philadelphia, Delaware, Bucks, and Chester Counties — with specializations, certifications, and contact info.",
    content: <Post1Content />,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
