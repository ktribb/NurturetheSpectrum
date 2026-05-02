import React from "react";
import { Link } from "wouter";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
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
        <span key={t} className="inline-block bg-accent/15 text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
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

const CtaBox = ({ title, body }: { title: string; body: string }) => (
  <div className="not-prose bg-primary rounded-xl px-8 py-10 my-10 text-center">
    <h2 className="text-xl font-bold text-white mb-3">{title}</h2>
    <p className="text-primary-foreground/80 mb-5 text-sm leading-relaxed">{body}</p>
    <Link href="/directory" className="inline-block bg-accent text-white font-bold px-7 py-3 rounded-lg hover:bg-accent/90 transition-colors text-sm">
      Browse All Agencies →
    </Link>
  </div>
);

const FooterNote = () => (
  <div className="not-prose border-t border-border mt-12 pt-6 text-xs text-muted-foreground">
    <p>NurturetheSpectrum.com is an independent directory. We do not receive compensation for agency listings unless noted as Featured or Verified. Always conduct your own due diligence before hiring a caregiver or agency. Information is updated periodically — contact agencies directly to confirm current availability and rates.</p>
    <p className="mt-2">© 2026 NurturetheSpectrum.com</p>
  </div>
);

// ─── Post 1: Philadelphia ────────────────────────────────────────────────────

const Post1Content = () => (
  <div className="prose prose-lg prose-slate max-w-none">
    <div className="bg-primary/8 border-l-4 border-primary rounded-r-lg px-5 py-4 mb-8 not-prose">
      <p className="text-foreground/80 leading-relaxed text-base">
        Finding the right childcare for a child with autism or special needs takes more than a standard nanny search. You need caregivers with the right training, the right temperament, and experience working with kids who have unique sensory, behavioral, and communication needs. This guide cuts straight to the agencies serving the Philadelphia metro area that specialize in exactly that.
      </p>
    </div>

    <p>We've researched and compiled the top autism and special needs nanny agencies across <strong>Philadelphia, Delaware County, Bucks County, and Chester County</strong>. Each agency below has been selected for its specialization in autism and neurodivergent childcare, certified or trained staff, and track record serving Philadelphia-area families.</p>

    <div className="bg-accent/10 border-l-4 border-accent rounded-r-lg px-5 py-4 my-6 not-prose">
      <p className="text-sm text-foreground/80"><strong className="text-accent-foreground">Pro tip:</strong> When contacting any agency, ask specifically about ABA training, BCBA supervision, and experience with your child's specific diagnosis. The more specific you are, the better match you'll get.</p>
    </div>

    <div className="not-prose">
      <AgencyCard num={1} name="The Nanny Share Network" county="Philadelphia, Montgomery, Delaware & Bucks Counties" tags={["Autism", "Cerebral Palsy", "Down Syndrome", "All Special Needs"]} phone="(215) 277-1300" website="https://thenannysharenetwork.com">
        <p>One of the most comprehensive special needs nanny matching agencies in the Philadelphia metro area. The Nanny Share Network specializes specifically in pairing families who have children with disabilities with experienced, screened caregivers. They also serve New Jersey, Delaware, and New York.</p>
      </AgencyCard>
      <AgencyCard num={2} name="Balanced Babysitting" county="West Chester, PA (Chester County)" tags={["Autism", "ADHD", "Neurodivergent"]} certTags={["BCBA-Led", "ABA-Trained Staff"]} phone="(484) 401-9738" email="Info@balancedbabysitting.com" website="https://balancedbabysitting.com">
        <p>A standout agency for families who want clinical-level expertise in their childcare. Balanced Babysitting is led by a Board Certified Behavior Analyst (BCBA) and places caregivers who are trained in ABA principles. They serve Chester, Delaware, Montgomery, Bucks, Berks, and Philadelphia Counties — making them one of the widest-reach specialty agencies in the area.</p>
      </AgencyCard>
      <AgencyCard num={3} name="Autism Babysitters" county="Serves Philadelphia Metro Area (National Platform)" tags={["Autism Spectrum Disorder"]} certTags={["ABA-Trained"]} phone="(888) 448-0430" website="https://autismbabysitters.com">
        <p>A platform built exclusively for autism families. Every caregiver on Autism Babysitters is trained in ABA principles and evidence-based techniques for working with children on the spectrum. For Philadelphia families who want a caregiver with dedicated autism-specific training, this is one of the most targeted options available.</p>
      </AgencyCard>
      <AgencyCard num={4} name="Jovie of Philadelphia" county="Philadelphia City & Wayne, PA (Main Line)" tags={["Special Needs", "Autism", "Respite Care"]} certTags={["Trained & Screened Nannies"]} website="https://jovie.com/services/special-needs/" websiteLabel="jovie.com/services/special-needs">
        <p>Jovie is a nationwide agency with a dedicated special needs and respite care division. Their Philadelphia presence covers both the city and the Main Line (Wayne, PA), making them a solid option for families in the western suburbs. All caregivers go through background checks and specialized training.</p>
      </AgencyCard>
      <AgencyCard num={5} name="Choose the Right Nanny (CTR Nanny)" county="Serves Philadelphia Metro (Nationwide Agency)" tags={["Autism", "ADHD", "Down Syndrome", "Cerebral Palsy", "G-Tube", "Hearing Impaired"]} website="https://ctrnanny.com" websiteLabel="ctrnanny.com/services/specialty-childcare/special-needs">
        <p>CTR Nanny has one of the most detailed specialty childcare divisions we've seen. Their special needs placement team handles a wide range of diagnoses — including medically complex children requiring G-tube care — and typically places caregivers within 2 to 8 weeks. A strong choice for families with complex or multiple diagnoses.</p>
      </AgencyCard>
      <AgencyCard num={6} name="Helping Hands Family" county="Drexel Hill (Delaware County) & West Chester/Paoli (Chester County)" tags={["Autism", "ABA Therapy", "Early Intervention"]} certTags={["BHCOE-Accredited", "BCBA Staff"]} phone="(484) 965-9966" website="https://hhfamily.com">
        <p>Helping Hands Family is BHCOE-accredited — a nationally recognized quality standard for ABA providers — and has physical locations in both Delaware and Chester Counties. They offer in-home and clinic-based ABA, and their staff includes BCBAs and RBTs who can deliver caregiver-adjacent services in your home.</p>
      </AgencyCard>
      <AgencyCard num={7} name="Beyond Autism Services" county="West Chester, Media & Havertown, PA (Chester & Delaware Counties)" tags={["Autism", "ABA Therapy", "Speech Therapy", "Occupational Therapy"]} certTags={["BCBA-Supervised", "BHCOE-Accredited"]} phone="(610) 572-5520" email="Admin@beyondautismservices.com" website="https://beyondautismservices.com">
        <p>Beyond Autism Services offers a collaborative ABA + speech + occupational therapy model, making them ideal for families who need more than just behavioral support. With three suburban Philadelphia locations, they're highly accessible for Delaware and Chester County families. Their BCBAs and RBTs may also be available for in-home caregiver sessions.</p>
      </AgencyCard>
      <AgencyCard num={8} name="Aspire Child & Family Services" county="Huntingdon Valley, PA (Montgomery & Bucks Counties)" tags={["Autism", "ABA Therapy", "Behavioral Health"]} certTags={["BCBA Staff"]} phone="(267) 388-0670" email="info@AspireCFS.com" website="https://aspirecfs.com">
        <p>Aspire CFS delivers in-home, school, and community-based ABA for children in Montgomery and Bucks Counties. They also offer diagnostic testing and counseling alongside childcare support, making them a good all-in-one option for families navigating the early stages of diagnosis and treatment.</p>
      </AgencyCard>
      <AgencyCard num={9} name="Acclaim Autism" county="West Chester & Philadelphia, PA" tags={["Autism", "ABA Therapy"]} certTags={["BCBA-Supervised"]} phone="(888) 805-8206" email="info@acclaimautism.com" website="https://acclaimautism.com">
        <p>Acclaim Autism offers in-home and clinic-based ABA across Chester County, Delaware County, and the Main Line. Their community and school-based ABA model is a good fit for families who want caregiver support that extends beyond the home environment. They have a Philadelphia location as well.</p>
      </AgencyCard>
      <AgencyCard num={10} name="A-Team Home Care" county="Feasterville, PA (Philadelphia City & Bucks County)" tags={["Autism", "Pediatric Special Needs", "In-Home Support"]} certTags={["ABA-Informed Care"]} phone="(215) 490-9994" website="https://ateampa.com">
        <p>A-Team Home Care focuses specifically on autism home care in the Philadelphia area, offering personalized care plans that combine behavioral and developmental support with skilled nursing when needed. They accept Medicaid and offer free in-home consultations — a big plus for families navigating insurance and waiver programs.</p>
      </AgencyCard>
    </div>

    <CtaBox title="Browse the Full Philadelphia Autism Childcare Directory" body="NurturetheSpectrum.com lists 35+ vetted agencies and providers across Philadelphia, Delaware, Bucks, and Chester Counties — with filters by county, specialization, and certification." />

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

    <FooterNote />
  </div>
);

// ─── Post 2: Delaware ────────────────────────────────────────────────────────

const Post2Content = () => (
  <div className="prose prose-lg prose-slate max-w-none">
    <div className="bg-primary/8 border-l-4 border-primary rounded-r-lg px-5 py-4 mb-8 not-prose">
      <p className="text-foreground/80 leading-relaxed text-base">
        Finding qualified autism and special needs childcare in Delaware means knowing where to look. This guide is for parents who already know what their child needs and are ready to connect with an agency — whether that's in-home ABA, respite care, or a certified nanny placement. We've compiled the top agencies serving Wilmington, Newark, Dover, and communities across the state.
      </p>
    </div>

    <p>Delaware may be small, but its autism services network is substantial. From BCBA-supervised in-home ABA providers to statewide advocacy organizations, the agencies below serve families across <strong>New Castle County, Kent County, and Sussex County</strong>.</p>

    <div className="bg-accent/10 border-l-4 border-accent rounded-r-lg px-5 py-4 my-6 not-prose">
      <p className="text-sm text-foreground/80"><strong className="text-accent-foreground">Delaware families:</strong> Delaware's Division of Developmental Disabilities Services (DDDS) administers Medicaid waivers that can fund in-home supports for eligible children with autism. Ask any agency below whether they accept DDDS waiver funding before paying out of pocket.</p>
    </div>

    <div className="not-prose">
      <AgencyCard num={1} name="ABA Centers of Delaware" county="Wilmington, DE (New Castle County)" tags={["Autism", "ABA Therapy", "Early Intervention", "In-Home Services"]} certTags={["BCBA", "RBT"]} phone="(844) 855-8517" website="https://abacentersde.com">
        <p>One of Delaware's most comprehensive ABA providers, offering both in-home and center-based services. ABA Centers of Delaware specializes in early intervention and has a strong track record working with children on the autism spectrum from toddlerhood through adolescence.</p>
      </AgencyCard>
      <AgencyCard num={2} name="Acclaim Autism — Delaware" county="Wilmington, DE (serving New Castle County)" tags={["Autism", "ABA Therapy", "In-Home Services"]} certTags={["BCBA", "RBT"]} phone="(866) 810-0383" email="twelch@acclaimautism.com" website="https://acclaimautism.com">
        <p>Acclaim Autism brings its BCBA-supervised ABA model to Delaware, serving families in Wilmington, Newark, Bear, and surrounding New Castle County communities. Their in-home focus makes them a strong choice for families who need therapy delivered where the child is most comfortable.</p>
      </AgencyCard>
      <AgencyCard num={3} name="BrightBloom Centers" county="Wilmington, Middletown & Milford, DE" tags={["Autism", "ABA Therapy"]} certTags={["BCBA", "RBT"]} website="https://brightbloom.com">
        <p>With three centers spread across Delaware — Wilmington, Middletown, and Milford — BrightBloom covers the state more geographically than most providers. This makes them a particularly good option for families in central and southern Delaware who often have fewer local choices.</p>
      </AgencyCard>
      <AgencyCard num={4} name="Skillful Steps ABA" county="Wilmington, Newark, Dover, Delaware City & Lewes, DE" tags={["Autism", "ABA Therapy", "In-Home Services"]} certTags={["BCBA", "RBT"]} phone="(866) 788-0051" email="contact@skillfulstepsaba.com" website="https://skillfulstepsaba.com">
        <p>Skillful Steps ABA serves one of the widest geographic ranges in Delaware, with presence in five cities spanning all three counties. Their in-home service model means families don't have to commute for therapy — a significant benefit for families managing complex schedules.</p>
      </AgencyCard>
      <AgencyCard num={5} name="Achieve Beyond — Delaware" county="Wilmington, DE" tags={["Autism", "ABA Therapy", "Pediatric Therapy"]} certTags={["BCBA", "RBT"]} phone="(703) 237-2219" email="DEinfo@achievebeyondusa.com" website="https://achievebeyondusa.com">
        <p>Achieve Beyond is a multi-state provider with a strong Delaware presence. Their pediatric therapy model goes beyond ABA to include speech, occupational, and physical therapy — making them well-suited for children with multiple therapy needs alongside autism support.</p>
      </AgencyCard>
      <AgencyCard num={6} name="Applied ABC" county="Delaware (statewide)" tags={["Autism", "ABA Therapy", "Home-Based Services"]} certTags={["BCBA", "RBT"]} phone="(866) 352-5010" website="https://appliedabc.com">
        <p>Applied ABC is a nationally recognized ABA provider with Delaware locations. Their home-based focus and established clinical model make them a reliable choice for families seeking consistent, evidence-based autism support delivered in the home environment.</p>
      </AgencyCard>
      <AgencyCard num={7} name="Nemours Swank Autism Center" county="Wilmington, DE" tags={["Autism Evaluation", "Rehabilitation Therapy", "Medical Services"]} certTags={["Pediatric Specialists"]} website="https://nemours.org">
        <p>The Nemours Swank Autism Center is Delaware's premier medical autism center, offering comprehensive evaluations, rehabilitation therapy, and coordinated care for children with autism. If you're navigating a new diagnosis or need a multi-disciplinary team, Nemours is the top resource in the state.</p>
      </AgencyCard>
      <AgencyCard num={8} name="Easterseals Delaware" county="Delaware (statewide)" tags={["Early Intervention", "Speech Therapy", "Occupational Therapy", "Autism Services"]} certTags={["Licensed Therapists"]} website="https://demd.easterseals.com">
        <p>Easterseals Delaware has served families with disabilities for decades. Their early intervention, OT, PT, and speech therapy services are available statewide and are particularly strong for younger children with autism or developmental delays who need multi-disciplinary support.</p>
      </AgencyCard>
      <AgencyCard num={9} name="The Arc of Delaware" county="Delaware (statewide)" tags={["Disability Services", "Advocacy", "Program Support"]} certTags={["Licensed Staff"]} phone="(302) 996-9400" website="https://thearcofdelaware.org">
        <p>With 40+ years serving Delaware's disability community, The Arc of Delaware is a foundational resource for families navigating autism and developmental disabilities. They provide direct services, advocacy, and connections to programs and funding that many families don't know exist.</p>
      </AgencyCard>
      <AgencyCard num={10} name="Autism Delaware" county="Wilmington, DE (statewide resource)" tags={["Resource Directory", "ABA Referrals", "Therapy Referrals", "Family Support"]} phone="(302) 427-0900" website="https://autismdelaware.org">
        <p>Autism Delaware is the state's leading autism-specific advocacy and resource organization. If you're not sure where to start, call them first — they can refer you to vetted providers, connect you with support groups, and help you navigate DDDS waiver funding and school services.</p>
      </AgencyCard>
    </div>

    <CtaBox title="Browse the Full Delaware Autism Childcare Directory" body="NurturetheSpectrum.com lists vetted autism and special needs agencies across Delaware, Pennsylvania, Maryland, and New Jersey — with filters by county, specialization, and certification." />

    <h2>What to Ask Before Hiring an Autism Childcare Agency in Delaware</h2>
    <ul>
      <li><strong>Do you accept DDDS waiver funding?</strong> Delaware's Division of Developmental Disabilities Services funds in-home supports for eligible children — ask every agency this question first.</li>
      <li><strong>Are your therapists BCBA-certified or RBT-certified?</strong> Board Certified Behavior Analysts and Registered Behavior Technicians are the gold standard for ABA-based autism support.</li>
      <li><strong>Do you offer in-home services?</strong> Many families prefer therapy in the home environment where children feel most comfortable.</li>
      <li><strong>What is your intake and waitlist timeline?</strong> Some Delaware providers have waitlists — ask upfront so you can plan accordingly.</li>
      <li><strong>Do you coordinate with my child's school IEP team?</strong> The best providers work collaboratively with schools to create a consistent support plan.</li>
    </ul>

    <h2>Frequently Asked Questions</h2>
    <p className="font-bold text-primary not-prose mt-5 mb-1">Does Delaware Medicaid cover autism therapy and childcare?</p>
    <p>Yes. Delaware's DDDS (Division of Developmental Disabilities Services) administers Medicaid waiver programs that can fund in-home supports, respite care, and behavioral therapy for eligible individuals with autism and developmental disabilities. Contact DDDS at (302) 255-9390 to begin an eligibility assessment.</p>
    <p className="font-bold text-primary not-prose mt-5 mb-1">What areas of Delaware do these agencies serve?</p>
    <p>Most agencies listed serve New Castle County (Wilmington, Newark, Bear, Middletown). Several — including BrightBloom, Skillful Steps, and Easterseals — also serve Kent County (Dover) and Sussex County (Lewes, Georgetown). Delaware's small size means many providers are willing to travel across county lines.</p>
    <p className="font-bold text-primary not-prose mt-5 mb-1">How do I find an autism nanny in Delaware?</p>
    <p>Delaware has fewer dedicated nanny placement agencies than larger states. Your best path is to contact an ABA agency like those listed above and ask if their RBTs or therapists are available for private in-home caregiver hours. Autism Delaware can also provide referrals to individual caregivers with autism-specific training.</p>
    <p className="font-bold text-primary not-prose mt-5 mb-1">Is NurturetheSpectrum.com focused only on Philadelphia?</p>
    <p>No — NurturetheSpectrum.com covers the entire Delaware Valley region including Delaware, southeastern Pennsylvania, northeastern Maryland, and southern New Jersey. Use the directory filters to find providers in your specific area.</p>

    <FooterNote />
  </div>
);

// ─── Post 3: Maryland ────────────────────────────────────────────────────────

const Post3Content = () => (
  <div className="prose prose-lg prose-slate max-w-none">
    <div className="bg-primary/8 border-l-4 border-primary rounded-r-lg px-5 py-4 mb-8 not-prose">
      <p className="text-foreground/80 leading-relaxed text-base">
        Northeastern Maryland — covering Harford County, Cecil County, and the northern suburbs of Baltimore — has a growing network of autism and special needs childcare providers. This guide is for parents who know what they need and are ready to connect with a qualified agency. We've pulled together the best in-home ABA providers, respite care agencies, and autism support organizations serving this region.
      </p>
    </div>

    <p>Families in <strong>Bel Air, Aberdeen, Edgewood, Elkton, Havre de Grace</strong>, and surrounding communities have more options than many realize. Here's where to start.</p>

    <div className="bg-accent/10 border-l-4 border-accent rounded-r-lg px-5 py-4 my-6 not-prose">
      <p className="text-sm text-foreground/80"><strong className="text-accent-foreground">Maryland families:</strong> Maryland's Autism Waiver program funds in-home and community-based supports for eligible children with autism. Ask every agency whether they are an approved Maryland Autism Waiver provider — it can significantly reduce your out-of-pocket costs.</p>
    </div>

    <div className="not-prose">
      <AgencyCard num={1} name="Storybook ABA" county="Bel Air, MD (Harford County)" tags={["Autism", "ABA Therapy", "In-Home Services"]} certTags={["BCBA", "RBT"]} phone="(410) 885-6223" email="info@storybookaba.com" website="https://storybookaba.com">
        <p>Storybook ABA is one of the most established in-home ABA providers in Harford County, serving families in Bel Air, Aberdeen, and Edgewood. Their in-home model means therapy happens where children are most at ease, and their BCBA-supervised team brings clinical rigor to every session.</p>
      </AgencyCard>
      <AgencyCard num={2} name="Blue ABA Therapy" county="Bel Air, MD (Harford County)" tags={["Autism", "ABA Therapy", "In-Home Services"]} certTags={["BCBA", "RBT"]} website="https://blueabatherapy.com">
        <p>Blue ABA Therapy focuses on Harford County families and accepts both Cigna and Medicaid — making them one of the more accessible options in the region for families using insurance. Their in-home model and personalized approach have made them a strong local choice.</p>
      </AgencyCard>
      <AgencyCard num={3} name="Actify ABA" county="Harford County, MD" tags={["Autism", "ABA Therapy", "In-Home Services"]} certTags={["BCBA", "RBT"]} website="https://actifyaba.com">
        <p>Actify ABA serves Harford County with in-home ABA therapy under BCBA supervision. With multiple Maryland locations, they offer families flexibility in how and where services are delivered — an important consideration for families juggling work and therapy schedules.</p>
      </AgencyCard>
      <AgencyCard num={4} name="Jade ABA" county="Elkton, MD (Cecil County)" tags={["Autism", "ABA Therapy", "In-Home Services"]} certTags={["BCBA", "RBT"]} website="https://jadeaba.org">
        <p>Cecil County families often struggle to find local autism providers — Jade ABA fills that gap. Based in Elkton and serving Cecil County, they bring BCBA-supervised ABA directly to families in one of Maryland's underserved regions. If you're in the Elkton, North East, or Perryville area, this is a strong starting point.</p>
      </AgencyCard>
      <AgencyCard num={5} name="Behavioral Innovations" county="Forest Hill & Bel Air, MD (Harford County)" tags={["Autism", "ABA Therapy", "Center-Based Services"]} certTags={["BCBA", "RBT"]} phone="(855) 782-7822" email="admissions@bi-aba.com" website="https://behavioral-innovations.com">
        <p>With 25+ years of experience and multiple Maryland locations including Forest Hill and Bel Air, Behavioral Innovations is one of the most experienced ABA providers in the region. Their center-based model is a great fit for children who benefit from a structured clinical environment alongside or instead of home-based services.</p>
      </AgencyCard>
      <AgencyCard num={6} name="Trellis Services" county="Sparks, MD (Baltimore County)" tags={["Autism", "ABA Therapy", "Autism Waiver Services", "School-Based ABA"]} certTags={["BCBA", "DDA Waiver Provider"]} phone="(443) 330-7900" website="https://trellisservices.com">
        <p>Trellis Services is one of Maryland's most established autism waiver providers, having served 200+ families on the Autism Waiver program. Their combination of in-home, school-based, and community ABA makes them a comprehensive option for families in northern Baltimore County and surrounding areas.</p>
      </AgencyCard>
      <AgencyCard num={7} name="Autism Connection Inc." county="Harford / Howard / Baltimore / Cecil Counties, MD" tags={["Autism", "ABA Therapy", "After-School Programs", "Summer Camps", "In-Home Services"]} certTags={["BCBA", "DDA Waiver Provider"]} website="https://autismconnectioninc.com">
        <p>Autism Connection Inc. is uniquely positioned as a multi-county Maryland autism waiver provider that goes beyond clinical therapy to offer after-school programs and summer camps. For families looking for year-round structured support — not just therapy hours — they're one of the most versatile agencies in the region.</p>
      </AgencyCard>
      <AgencyCard num={8} name="Circle Care Services" county="Baltimore, MD" tags={["Autism", "ABA Therapy", "In-Home Services", "Daycare ABA"]} certTags={["BCBA", "RBT"]} phone="(877) 734-4536" email="abatherapy@circlecareservices.com" website="https://circlecareservices.com">
        <p>Circle Care Services offers a distinctive model that includes ABA delivered in daycare settings — ideal for working parents who need autism support integrated into their child's existing childcare arrangement. Their in-home and center-based options round out a flexible service menu.</p>
      </AgencyCard>
      <AgencyCard num={9} name="Pathfinders for Autism" county="Maryland (statewide resource)" tags={["Resource & Referrals", "Training", "Advocacy", "Family Support"]} phone="(443) 330-5341" website="https://pathfindersforautism.org">
        <p>Pathfinders for Autism is Maryland's largest autism advocacy organization. They don't provide direct therapy, but they're the best first call for any family navigating the system — offering provider referrals, caregiver training, school advocacy support, and connections to funding programs across the state.</p>
      </AgencyCard>
      <AgencyCard num={10} name="Autism Learning Partners — Maryland" county="Silver Spring & Baltimore, MD" tags={["Autism", "ABA Therapy"]} certTags={["BCBA", "RBT"]} website="https://autismlearningpartners.com">
        <p>With 35+ years of experience, Autism Learning Partners is one of the most established ABA providers in the country, with a strong Maryland presence. Their clinically proven model and experienced staff make them a reliable choice for families who want a proven track record behind their child's care.</p>
      </AgencyCard>
    </div>

    <CtaBox title="Browse the Full Maryland Autism Childcare Directory" body="NurturetheSpectrum.com lists vetted autism and special needs agencies across Maryland, Delaware, Pennsylvania, and New Jersey — with filters by county, specialization, and certification." />

    <h2>What to Ask Before Hiring an Autism Childcare Agency in Maryland</h2>
    <ul>
      <li><strong>Are you a Maryland Autism Waiver provider?</strong> The waiver can fund significant in-home and community-based services — always ask this first.</li>
      <li><strong>Do you serve my specific county?</strong> Many Maryland providers are county-specific. Confirm they serve Harford, Cecil, or your county before starting the intake process.</li>
      <li><strong>What is your BCBA-to-RBT supervision ratio?</strong> More frequent BCBA oversight typically means better outcomes for your child.</li>
      <li><strong>Do you coordinate with my child's IEP team?</strong> School and home services work best when the teams communicate directly.</li>
      <li><strong>What is your current waitlist?</strong> Some Maryland providers have waitlists of several months — ask on your first call.</li>
    </ul>

    <h2>Frequently Asked Questions</h2>
    <p className="font-bold text-primary not-prose mt-5 mb-1">Does Maryland Medicaid cover autism therapy?</p>
    <p>Yes. Maryland's Autism Waiver program funds community-based services for children and adults with autism spectrum disorder. Eligibility is based on diagnosis and functional need. Contact Maryland's Developmental Disabilities Administration (DDA) at 1-888-279-0340 to start the eligibility process.</p>
    <p className="font-bold text-primary not-prose mt-5 mb-1">What counties does this guide cover?</p>
    <p>This guide focuses on Harford County, Cecil County, and northern Baltimore County — the northeastern Maryland corridor. NurturetheSpectrum.com's full directory also includes agencies serving other Maryland counties.</p>
    <p className="font-bold text-primary not-prose mt-5 mb-1">Is there a difference between an ABA agency and a nanny agency for autism?</p>
    <p>Yes. ABA agencies provide clinically supervised behavioral therapy and bill insurance or Medicaid. Nanny agencies place caregivers — some with ABA or special needs training — for in-home childcare. Many families use both: an ABA agency for therapy hours and a trained nanny for additional daily care. The agencies listed here can help with both or point you in the right direction.</p>

    <FooterNote />
  </div>
);

// ─── Post 4: South Jersey ────────────────────────────────────────────────────

const Post4Content = () => (
  <div className="prose prose-lg prose-slate max-w-none">
    <div className="bg-primary/8 border-l-4 border-primary rounded-r-lg px-5 py-4 mb-8 not-prose">
      <p className="text-foreground/80 leading-relaxed text-base">
        South Jersey has a well-developed autism services network that many families don't fully know about. This guide is for parents actively searching for in-home ABA therapy, autism-trained nanny agencies, or respite care providers across Camden, Burlington, Gloucester, Atlantic, and surrounding counties. We've pulled together the most relevant agencies so you can move fast.
      </p>
    </div>

    <p>Whether you're in <strong>Cherry Hill, Marlton, Vineland, Somers Point</strong>, or anywhere in between, these are the providers worth contacting first.</p>

    <div className="bg-accent/10 border-l-4 border-accent rounded-r-lg px-5 py-4 my-6 not-prose">
      <p className="text-sm text-foreground/80"><strong className="text-accent-foreground">New Jersey families:</strong> New Jersey's CAH (Community Care Waiver) and the NJ Autism Registry connect families with funded in-home services. New Jersey also has a strong autism mandate law requiring insurance coverage for ABA therapy. Ask every agency whether they accept your insurance and whether they can help you access NJ state funding.</p>
    </div>

    <div className="not-prose">
      <AgencyCard num={1} name="Proud Moments ABA" county="Cherry Hill & Vineland, NJ" tags={["Autism", "ABA Therapy", "Clinic-Based & In-Home"]} certTags={["BCBA", "RBT"]} phone="(973) 210-9040" website="https://proudmomentsaba.com">
        <p>One of the largest ABA providers in the country with a strong South Jersey presence, Proud Moments ABA serves families in Cherry Hill and Vineland with both clinic-based and in-home therapy. Their size means shorter waitlists than many smaller providers, and their clinical model is well-established and insurance-friendly.</p>
      </AgencyCard>
      <AgencyCard num={2} name="ABA Centers of New Jersey" county="Cherry Hill, NJ (Camden County)" tags={["Autism", "ABA Therapy", "Center-Based & In-Home"]} certTags={["BCBA", "RBT"]} phone="(855) 640-7888" website="https://abacentersnj.com">
        <p>ABA Centers of NJ brings a highly structured, evidence-based ABA model to South Jersey families. Their Cherry Hill location serves Camden County and surrounding areas, with both center-based programming and in-home services available depending on each child's needs and goals.</p>
      </AgencyCard>
      <AgencyCard num={3} name="GentleCare Therapy" county="Gibbsboro, NJ (Camden County)" tags={["Autism", "ABA Therapy", "Speech Therapy", "Occupational Therapy"]} certTags={["BCBA", "RBT", "Licensed SLP"]} phone="(856) 484-5535" website="https://gentlecaretherapy.com">
        <p>GentleCare Therapy stands out in South Jersey for its truly multi-disciplinary model — ABA, speech therapy, and occupational therapy all under one roof. For children who need support across multiple developmental areas, this collaborative approach produces stronger outcomes than working with separate providers.</p>
      </AgencyCard>
      <AgencyCard num={4} name="All About ABA" county="Marlton, NJ (Burlington County)" tags={["Autism", "ABA Therapy", "Home / Clinic / Community"]} certTags={["BCBA", "RBT"]} phone="(844) 525-5226" website="https://allaboutaba.com">
        <p>All About ABA uses a naturalistic, play-based approach to ABA — a particularly good fit for younger children or those who respond better to child-led, relationship-based therapy than traditional table-top ABA. Based in Marlton, they serve Burlington County and surrounding areas with home, clinic, and community options.</p>
      </AgencyCard>
      <AgencyCard num={5} name="Autism Spectrum Mandate Services" county="Medford, NJ (Burlington County)" tags={["Autism", "ABA Therapy", "In-Home Services"]} certTags={["BCBA", "RBT"]} phone="(609) 953-5793" email="rebecca@autismservicesnj.org" website="https://autismservicesnj.org">
        <p>Based in Medford and serving Camden, Burlington, Gloucester, and Cumberland Counties, Autism Spectrum Mandate Services is one of the few South Jersey providers with explicit multi-county coverage. Their in-home focus and geographic reach make them a strong option for families in less-served parts of the region.</p>
      </AgencyCard>
      <AgencyCard num={6} name="Positive Development" county="Cherry Hill, NJ (Camden County)" tags={["Autism", "ABA Therapy", "DIR/Floortime", "Relationship-Based Intervention"]} certTags={["BCBA", "RBT"]} phone="(833) 587-1784" website="https://positivedevelopment.com">
        <p>Positive Development is one of the few South Jersey providers offering DIR/Floortime alongside traditional ABA — a relationship-based approach that many families find more aligned with their values and their child's learning style. They offer in-home, community, and virtual services, giving families maximum flexibility.</p>
      </AgencyCard>
      <AgencyCard num={7} name="Bierman Autism Centers" county="Eatontown, NJ (Monmouth County)" tags={["Autism", "ABA Therapy", "Speech Therapy", "Occupational Therapy"]} certTags={["BCBA", "RBT", "Licensed SLP"]} phone="(800) 931-8113" website="https://biermanautism.com">
        <p>Bierman Autism Centers is a nationally recognized provider with multiple New Jersey locations. Their comprehensive model — combining ABA with speech and OT under BCBA oversight — and their 18+ year track record make them one of the most trusted names in the state for autism-specific childcare and therapy.</p>
      </AgencyCard>
      <AgencyCard num={8} name="Attain ABA" county="Cherry Hill, NJ (serves 13+ NJ counties)" tags={["Autism", "ABA Therapy", "In-Home Services"]} certTags={["BCBA", "RBT"]} phone="(833) 599-2560" website="https://attainaba.com">
        <p>Attain ABA's South Jersey operations cover more than 13 New Jersey counties, making them one of the widest-reaching providers in the state. For families in rural or suburban South Jersey who struggle to find local providers, Attain's broad geographic coverage is a significant advantage.</p>
      </AgencyCard>
      <AgencyCard num={9} name="Kaleidoscope Family Solutions" county="Somers Point, NJ (Atlantic County)" tags={["Autism", "ABA Therapy", "In-Home & Virtual"]} certTags={["BCBA", "RBT"]} phone="(877) 222-0399" website="https://kaleidoscopefamilysolutions.com">
        <p>Atlantic County families have fewer local options than those closer to Philadelphia, making Kaleidoscope Family Solutions a standout resource. Based in Somers Point, they serve Atlantic County with in-home and virtual ABA therapy — the virtual option being especially useful for families in more rural parts of the county.</p>
      </AgencyCard>
      <AgencyCard num={10} name="NeurAbilities Healthcare — Cherry Hill" county="Cherry Hill, NJ (Camden County)" tags={["Autism", "ABA Therapy", "Neurological Services", "Behavioral Health"]} certTags={["BCBA", "RBT"]} website="https://neurabilities.com">
        <p>NeurAbilities Healthcare brings a medical-grade, neurologically informed approach to autism care. Their Cherry Hill location serves Camden County and is particularly strong for children with complex neurological profiles alongside autism. They also have Pennsylvania locations for families straddling the Delaware River border.</p>
      </AgencyCard>
      <AgencyCard num={11} name="Autism NJ" county="New Jersey (statewide resource)" tags={["Resource & Referrals", "Advocacy", "Family Support", "Case Management"]} phone="1-800-428-8476" website="https://autismnj.org">
        <p>Autism NJ is the state's premier autism advocacy organization. They don't provide direct therapy, but if you're not sure where to start — or if you need help navigating New Jersey's insurance mandate, waiver programs, or school rights — call them first. Their statewide referral network connects families to vetted local providers.</p>
      </AgencyCard>
    </div>

    <CtaBox title="Browse the Full South Jersey Autism Childcare Directory" body="NurturetheSpectrum.com lists vetted autism and special needs agencies across New Jersey, Pennsylvania, Delaware, and Maryland — with filters by county, specialization, and certification." />

    <h2>What to Ask Before Hiring an Autism Childcare Agency in South Jersey</h2>
    <ul>
      <li><strong>Do you accept my insurance?</strong> New Jersey's autism insurance mandate requires most plans to cover ABA therapy — confirm your provider accepts your specific plan before starting the intake process.</li>
      <li><strong>Are you a NJ Medicaid provider?</strong> NJ Medicaid covers ABA therapy for eligible children. Ask specifically about NJ FamilyCare coverage.</li>
      <li><strong>Do you serve my county?</strong> South Jersey providers vary significantly in their geographic reach — always confirm your county is covered on the first call.</li>
      <li><strong>What is your current waitlist?</strong> Popular South Jersey providers can have waitlists. Ask upfront and get on multiple lists simultaneously if needed.</li>
      <li><strong>Do you offer both in-home and center-based options?</strong> Some children do better in a clinical environment; others thrive with home-based support. The best agencies offer both.</li>
    </ul>

    <h2>Frequently Asked Questions</h2>
    <p className="font-bold text-primary not-prose mt-5 mb-1">Does New Jersey insurance cover autism therapy?</p>
    <p>Yes. New Jersey has one of the strongest autism insurance mandates in the country, requiring most commercial health plans to cover ABA therapy, speech therapy, and occupational therapy for individuals with autism. Contact your insurance provider and ask specifically about autism benefits and ABA coverage before selecting an agency.</p>
    <p className="font-bold text-primary not-prose mt-5 mb-1">What counties does South Jersey include?</p>
    <p>South Jersey generally refers to Camden, Burlington, Gloucester, Salem, Cumberland, Atlantic, and Cape May Counties. NurturetheSpectrum.com's directory covers all of these counties along with agencies that serve the broader Delaware Valley region.</p>
    <p className="font-bold text-primary not-prose mt-5 mb-1">How close is South Jersey to Philadelphia autism services?</p>
    <p>Very close — many Philadelphia-based agencies serve South Jersey families, and several agencies listed on NurturetheSpectrum.com have offices on both sides of the Delaware River. If you're in Camden County especially, Philadelphia providers are often a realistic option.</p>
    <p className="font-bold text-primary not-prose mt-5 mb-1">What is the NJ autism insurance mandate?</p>
    <p>New Jersey law requires most health insurance plans to cover medically necessary treatment for autism spectrum disorder, including ABA therapy, without annual or lifetime dollar limits. This mandate applies to most employer-sponsored and individual plans. Self-funded plans (common with large employers) may be exempt — check your plan documents or call your HR department to confirm.</p>

    <FooterNote />
  </div>
);

// ─── Export ───────────────────────────────────────────────────────────────────

export const blogPosts: BlogPost[] = [
  {
    slug: "best-autism-nanny-agencies-philadelphia",
    title: "The Best Autism & Special Needs Nanny Agencies in Philadelphia (2026)",
    date: "May 2026",
    readTime: "7 min read",
    excerpt:
      "Looking for an autism or special needs nanny agency in Philadelphia? Here are the top agencies serving Philadelphia, Delaware, Bucks, and Chester Counties — with specializations, certifications, and contact info.",
    tags: ["Philadelphia", "Nanny Agencies", "ABA Therapy"],
    content: <Post1Content />,
  },
  {
    slug: "best-autism-childcare-agencies-delaware",
    title: "The Best Autism & Special Needs Childcare Agencies in Delaware (2026)",
    date: "May 2026",
    readTime: "7 min read",
    excerpt:
      "Looking for an autism or special needs childcare agency in Delaware? Here are the top agencies serving Wilmington, Newark, Dover, and surrounding areas — with specializations, certifications, and contact info.",
    tags: ["Delaware", "ABA Therapy", "Childcare Agencies"],
    content: <Post2Content />,
  },
  {
    slug: "best-autism-childcare-agencies-maryland",
    title: "The Best Autism & Special Needs Childcare Agencies in Northeastern Maryland (2026)",
    date: "May 2026",
    readTime: "7 min read",
    excerpt:
      "Top autism and special needs childcare agencies in Harford County, Cecil County, and Baltimore County Maryland — including ABA providers, in-home services, and respite care agencies.",
    tags: ["Maryland", "ABA Therapy", "Childcare Agencies"],
    content: <Post3Content />,
  },
  {
    slug: "best-autism-childcare-agencies-south-jersey",
    title: "The Best Autism & Special Needs Childcare Agencies in South Jersey (2026)",
    date: "May 2026",
    readTime: "8 min read",
    excerpt:
      "Top autism and special needs childcare agencies in South Jersey — Camden County, Burlington County, Gloucester County, Atlantic County and beyond. ABA providers, in-home services, and respite care.",
    tags: ["South Jersey", "Nanny Agencies", "ABA Therapy"],
    content: <Post4Content />,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
