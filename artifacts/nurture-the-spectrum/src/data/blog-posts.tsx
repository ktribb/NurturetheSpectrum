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

// ─── Shared components for series posts ─────────────────────────────────────

const PullQuote = ({ children }: { children: React.ReactNode }) => (
  <div className="not-prose my-8 border-l-4 border-accent pl-6 py-2">
    <p className="text-lg font-medium text-primary leading-relaxed italic">{children}</p>
  </div>
);

const TipBox = ({ label, children }: { label?: string; children: React.ReactNode }) => (
  <div className="not-prose bg-accent/10 border-l-4 border-accent rounded-r-lg px-5 py-4 my-6">
    {label && <p className="text-xs font-bold uppercase tracking-wider text-accent-foreground mb-2">{label}</p>}
    <div className="text-sm text-foreground/80 leading-relaxed">{children}</div>
  </div>
);

const IntroBox = ({ children }: { children: React.ReactNode }) => (
  <div className="not-prose bg-primary/8 border-l-4 border-primary rounded-r-lg px-5 py-4 mb-8">
    <p className="text-foreground/80 leading-relaxed text-base">{children}</p>
  </div>
);

const SeriesNav = ({ prev, next }: { prev?: { slug: string; label: string }; next?: { slug: string; label: string } }) => (
  <div className="not-prose flex flex-col sm:flex-row gap-3 mt-10 pt-6 border-t border-border">
    {prev && (
      <Link href={`/blog/${prev.slug}`} className="flex-1 bg-muted/40 hover:bg-muted border border-border rounded-xl px-4 py-3 text-sm text-muted-foreground hover:text-primary transition-colors">
        <span className="text-xs uppercase tracking-wider block mb-1">← Previous</span>
        <span className="font-medium line-clamp-1">{prev.label}</span>
      </Link>
    )}
    {next && (
      <Link href={`/blog/${next.slug}`} className="flex-1 bg-muted/40 hover:bg-muted border border-border rounded-xl px-4 py-3 text-sm text-muted-foreground hover:text-primary transition-colors text-right">
        <span className="text-xs uppercase tracking-wider block mb-1">Next →</span>
        <span className="font-medium line-clamp-1">{next.label}</span>
      </Link>
    )}
  </div>
);

const SeriesCtaBox = () => (
  <div className="not-prose bg-primary rounded-xl px-8 py-10 my-10 text-center">
    <h2 className="text-xl font-bold text-white mb-3">Find Providers Who Will Meet You Where You Are</h2>
    <p className="text-primary-foreground/80 mb-5 text-sm leading-relaxed">NurturetheSpectrum.com lists vetted autism and special needs childcare agencies across Pennsylvania, New Jersey, Delaware, and Maryland — with filters by county, service type, and certification.</p>
    <Link href="/directory" className="inline-block bg-accent text-white font-bold px-7 py-3 rounded-lg hover:bg-accent/90 transition-colors text-sm">
      Browse the Directory →
    </Link>
  </div>
);

// ─── After the Diagnosis Series ──────────────────────────────────────────────

const Post5Content = () => (
  <div className="prose prose-lg prose-slate max-w-none">
    <IntroBox>
      You already know your child. You know what lights them up and what shuts them down. You know the difference between the cry that means overwhelmed and the one that means frustrated. You know which textures are impossible, which routines are sacred, and which specific way they need you to say goodnight. You've known all of this for a long time. The diagnosis didn't teach you any of it.
    </IntroBox>
    <p>What the diagnosis does — the only thing it really does — is hand you a key. A key to systems, funding, services, and legal rights that were always there but that required this specific word to unlock. That's significant. But it isn't a revelation about your child. You already knew your child.</p>
    <p>A lot of parents come out of the evaluation appointment bracing for a new chapter — a before and an after. And in some practical ways there is one. But the child sitting next to you in the car on the way home is the same child who was sitting next to you on the way there.</p>
    <PullQuote>"The diagnosis was for the system. Your child has always been your child."</PullQuote>
    <h2>What You Already Had Before the Paperwork</h2>
    <p>Think about what you figured out on your own, without a clinical team, without a formal plan, without anyone validating that what you were doing was right. You learned how your child communicates — even when that communication doesn't look like what other people expect. You became fluent in their version of distress and their version of joy. You adjusted your entire life — your schedule, your social commitments, your home environment — to fit the actual person in front of you.</p>
    <p>That's not nothing. That's actually the most important work in your child's life, and you did it without anyone handing you a framework. The professionals who will now enter your child's life — BCBAs, speech therapists, occupational therapists, IEP teams — they know autism in general. You know <em>this</em> child specifically. Both kinds of knowledge matter. Neither replaces the other.</p>
    <h2>What the Diagnosis Actually Changes</h2>
    <p>So if the diagnosis doesn't change your child, what does it change? Practically speaking, quite a lot — all of it in your favor.</p>
    <ul>
      <li><strong>Insurance coverage unlocks.</strong> Every state now has an autism insurance mandate requiring most health plans to cover ABA therapy, speech therapy, and occupational therapy — often without a lifetime dollar cap.</li>
      <li><strong>School rights unlock.</strong> Under federal law (IDEA), a child with an autism diagnosis is entitled to a Free Appropriate Public Education with an IEP. The diagnosis triggers the right to request one.</li>
      <li><strong>State Medicaid waiver programs unlock.</strong> Most states have waiver programs that fund in-home services, respite care, and behavioral support — often for families who don't otherwise qualify for Medicaid based on income.</li>
      <li><strong>Specialized providers unlock.</strong> The best ABA agencies, autism-trained nanny agencies, and therapy providers require a formal diagnosis to begin services.</li>
      <li><strong>Community unlocks.</strong> Having a word for what your child experiences connects you to an enormous community of parents who understand without needing an explanation.</li>
    </ul>
    <h2>What People Will Expect You to Feel — and What You Might Actually Feel</h2>
    <p>There's a common script for how parents are supposed to react to an autism diagnosis. Grief is real — but it's not the only valid response, and for many parents it isn't the primary one. Some parents feel relief. Some feel vindicated after years of being dismissed. Some feel nothing dramatic at first, just a quiet continuation of what they were already doing. All of these are real. None of them require explanation or apology.</p>
    <TipBox label="Note on the people around you">
      Family members, friends, and even some professionals may project their own feelings onto the diagnosis. You don't have to absorb their emotional reaction. You've been living this. Your calibration is more accurate than theirs.
    </TipBox>
    <h2>What to Do Next — On Your Own Timeline</h2>
    <p>Most things worth doing after a diagnosis can wait a few days while you settle. The one exception: if your state's Medicaid waiver has a waitlist (most do), it's worth contacting your state's developmental disabilities office sooner rather than later — not because it's urgent emotionally, but because those waitlists are long and the clock starts on the day you apply. Everything else is a process, not a sprint.</p>
    <SeriesCtaBox />
    <SeriesNav
      next={{ slug: "after-diagnosis-2-youve-been-their-best-therapist", label: "You've Been Their Best Therapist All Along" }}
    />
  </div>
);

const Post6Content = () => (
  <div className="prose prose-lg prose-slate max-w-none">
    <IntroBox>
      Before any BCBA walked through your door, before any evaluation, before any official plan — you were already doing it. You were reading your child's signals and adjusting. You were building a communication system between the two of you that worked, even when nothing else seemed to. You were the first therapist your child ever had, and probably still the most effective one.
    </IntroBox>
    <p>One of the more disorienting things about entering the formal autism services world is how often it can feel like you're starting from zero. New intake forms. New professionals asking questions about your child that you've had answers to for years. New frameworks being presented as if you've never considered any of this before. You haven't been sitting still.</p>
    <h2>What You've Actually Been Doing</h2>
    <p>Parents of autistic children develop a specific set of skills that most people — including many professionals — underestimate, because the skills don't come with credentials attached.</p>
    <ul>
      <li><strong>Environmental reading.</strong> You've learned to scan a space before your child enters it — which stores have fluorescent lights that hum, which relatives' houses have a specific smell that makes the whole visit harder.</li>
      <li><strong>Communication translation.</strong> You've learned their language: what the particular way they pull at their sleeve means, what happens in their body before a meltdown starts. You are probably the most accurate interpreter your child has.</li>
      <li><strong>Transition management.</strong> You've figured out how much warning your child needs before a change. That's a formal skill in behavioral intervention. You built it from scratch.</li>
      <li><strong>Sensory accommodation.</strong> An occupational therapist might call this "sensory diet planning." You just call it Tuesday.</li>
      <li><strong>Motivation mapping.</strong> In ABA, this is called identifying reinforcers — it's one of the first and most important things a clinical team does. You already have years of data on it.</li>
    </ul>
    <PullQuote>"A BCBA who asks 'What have you noticed works?' in the first session is a BCBA worth keeping."</PullQuote>
    <h2>How to Bring What You Know Into the Clinical Setting</h2>
    <p>Before your first appointment with any new provider, consider writing down: your child's three most reliable motivators, their top three sensory triggers, what "calm" looks like in their body, what a meltdown looks like at the beginning, what helps when things are escalating, the routines that are non-negotiable, and how your child communicates consent and refusal.</p>
    <TipBox label="You can just hand it to them">
      A one-page "Here's what I know about my child" document is not unusual or presumptuous — it's efficient. Providers who are worth working with will be grateful for it. It tells them immediately that you're an active partner in your child's care.
    </TipBox>
    <h2>When the Clinical Picture Doesn't Match What You Know</h2>
    <p>It will happen. A provider will describe your child in terms that feel wrong, or make a recommendation that doesn't match what you know. You are allowed to say so. "That matches what I see in new environments, but at home it looks different" is a complete sentence. You don't have to accept a clinical characterization of your child that doesn't fit the child you know.</p>
    <h2>What Changes When You Have a Team</h2>
    <p>Having a clinical team doesn't mean handing your child off and waiting to be told what to do. The research on autism outcomes is consistent: family involvement is one of the strongest predictors of progress. Good providers will actively try to train you, involve you in goal-setting, and communicate regularly about what they're working on and why. The team supports you. You don't disappear into the team.</p>
    <SeriesCtaBox />
    <SeriesNav
      prev={{ slug: "after-diagnosis-1-diagnosis-doesnt-change-who-your-child-is", label: "The Diagnosis Doesn't Change Who Your Child Is" }}
      next={{ slug: "after-diagnosis-3-what-the-diagnosis-unlocks", label: "What the Diagnosis Actually Unlocks" }}
    />
  </div>
);

const Post7Content = () => (
  <div className="prose prose-lg prose-slate max-w-none">
    <IntroBox>
      You've been doing the day-to-day work without much external support for a while. Now that the diagnosis is official, a set of systems and funding streams that were previously inaccessible become available. This is a clear-eyed tour of what's there, how to access it, and what the realistic timeline looks like — without the anxiety of a to-do list.
    </IntroBox>
    <PullQuote>"The services were always there. The diagnosis is what makes you eligible to use them."</PullQuote>
    <h2>What's Now Available to You</h2>
    <h3>1. Insurance Coverage for Therapy</h3>
    <p>All 50 states now have autism insurance mandates. In Pennsylvania, New Jersey, Delaware, and Maryland, most commercial health plans are required to cover ABA therapy, speech-language therapy, and occupational therapy for children with an autism diagnosis — often without a lifetime dollar cap. Call your insurance member services line and ask specifically about autism benefits and the diagnosis code F84.0.</p>
    <TipBox label="Important nuance">
      If your employer is large and self-insured, they operate under federal ERISA rules rather than state mandates, which means the state autism mandate may not apply. Call HR to ask whether your plan is "fully insured" or "self-funded."
    </TipBox>
    <h3>2. School Rights Under IDEA</h3>
    <p>Federal law entitles children with disabilities to a Free Appropriate Public Education (FAPE) with an Individualized Education Program (IEP). The diagnosis triggers the right to request one. Submit a written request for a special education evaluation to your school district — from that point the district has a legally defined timeline to respond. IEP services (speech therapy, OT, behavioral support, 1:1 aides) are provided at no cost to you.</p>
    <h3>3. Medicaid Waiver Programs</h3>
    <p>This is the one most families don't hear about until years after they could have applied. Most states have waiver programs that fund in-home behavioral services, respite care, family training, and more — for families who don't otherwise qualify for Medicaid based on income. The catch: waitlists of one to five years. The day you apply is the day your position is established.</p>
    <ul>
      <li><strong>Pennsylvania:</strong> Consolidated Waiver / Community Living Waiver — contact your county's ODP Supports Coordinator at dhs.pa.gov</li>
      <li><strong>New Jersey:</strong> Community Care Waiver — call NJ DDD at 1-800-832-9173</li>
      <li><strong>Delaware:</strong> DDDS Lifespan Waiver — call DDDS at (302) 255-9390</li>
      <li><strong>Maryland:</strong> Autism Waiver through DDA — call 1-888-279-0340</li>
    </ul>
    <h3>4. Specialized Providers</h3>
    <p>The best ABA agencies, autism-trained nanny agencies, and therapy providers require a formal diagnosis to begin services. Starting intake conversations — even before you feel fully ready — means a shorter wait when you are ready.</p>
    <h2>What to Do While You're Waiting</h2>
    <p>Use your insurance benefits now. Contact your state's autism advocacy organization — Autism NJ, Pathfinders for Autism in Maryland, Autism Delaware. Get on multiple waitlists simultaneously; you're not committing to anything. Ask about private pay with waiver reimbursement later.</p>
    <SeriesCtaBox />
    <SeriesNav
      prev={{ slug: "after-diagnosis-2-youve-been-their-best-therapist", label: "You've Been Their Best Therapist All Along" }}
      next={{ slug: "after-diagnosis-4-talking-to-clinicians", label: "Talking to Clinicians When You Know More Than They Think" }}
    />
  </div>
);

const Post8Content = () => (
  <div className="prose prose-lg prose-slate max-w-none">
    <IntroBox>
      A clinician who has observed your child for two hours in an unfamiliar room under fluorescent lights does not know your child better than you do. That seems obvious when you say it plainly, but it can stop feeling obvious inside a clinical appointment when someone with credentials is presenting conclusions confidently. This post is about how to hold your ground — respectfully, productively, and effectively.
    </IntroBox>
    <h2>Two Kinds of Knowledge, Both Valid</h2>
    <p>Clinicians bring genuine expertise: knowledge of evidence-based interventions, understanding of developmental trajectories, clinical tools for measuring and tracking behavior. But it's expertise about autism in general. It's not knowledge of your specific child in their actual life. That knowledge lives with you. The best clinical relationships treat these as complementary rather than competing.</p>
    <PullQuote>"You don't need to win an argument. You need to make sure the person treating your child has accurate information."</PullQuote>
    <h2>The Most Common Situations — and What to Say</h2>
    <p><strong>The evaluation report describes your child inaccurately.</strong> "The report describes X, and I understand that's what the assessment showed. At home, what I actually observe is Y — and I think that's worth adding to the picture. Can we note that context in the documentation?"</p>
    <p><strong>A provider recommends something you know won't work.</strong> "We've tried something similar before and here's what happened. I want to make sure that history informs this plan."</p>
    <p><strong>Goals feel irrelevant to your family's actual life.</strong> "The goals as written feel distant from the things that would actually change our daily life. Can we revisit the priorities together?"</p>
    <p><strong>You're being dismissed when you raise a concern.</strong> "Can we agree on what we'd be looking for that would tell us it's time to take a different approach? I'd feel better knowing we have a clear decision point."</p>
    <p><strong>You want a disagreement on record.</strong> You have the right to submit a written parent statement that becomes part of your child's records. In the IEP context this is a formal mechanism.</p>
    <h2>Green Flags and Red Flags</h2>
    <ul>
      <li>✅ They ask "What have you noticed?" before telling you what they've observed</li>
      <li>✅ They explain recommendations in terms of your child's specific profile, not generic autism guidelines</li>
      <li>✅ They update their approach when you give them information that contradicts what they assumed</li>
      <li>❌ They present a plan with confidence before spending meaningful time with your child</li>
      <li>❌ They respond to your pushback with reassurance rather than engagement</li>
      <li>❌ Goals are generic and don't connect to your child's actual life</li>
    </ul>
    <TipBox label="You can leave">
      You're not locked in with a provider who doesn't listen to you. If three sessions in you feel consistently dismissed, it is completely reasonable to seek a different provider. The relationship has to be built on mutual respect to work.
    </TipBox>
    <h2>Preparing for High-Stakes Meetings</h2>
    <p>Bring someone with you. Write down your priorities before the meeting and refer to them out loud. For IEPs especially, you don't have to sign anything at the meeting — take documents home and review them first. After any significant conversation, send a brief email summarizing what was discussed and agreed. This creates a record and changes how carefully people follow through.</p>
    <SeriesCtaBox />
    <SeriesNav
      prev={{ slug: "after-diagnosis-3-what-the-diagnosis-unlocks", label: "What the Diagnosis Actually Unlocks" }}
      next={{ slug: "after-diagnosis-5-when-people-dont-get-it", label: "When People in Your Life Don't Get It" }}
    />
  </div>
);

const Post9Content = () => (
  <div className="prose prose-lg prose-slate max-w-none">
    <IntroBox>
      Long before the diagnosis, you were probably already managing the gap between what you knew about your child and what the people around you could see. The diagnosis doesn't close that gap automatically — in some ways it opens new versions of it. Here's how to handle the most common ones without burning through your energy on people who aren't going to change.
    </IntroBox>
    <PullQuote>"You don't owe anyone a full explanation. You owe your child a consistent, safe environment. Those are different obligations."</PullQuote>
    <h2>The People Who Show Up Most Often</h2>
    <h3>Grandparents and extended family</h3>
    <p><em>"He was fine when he was here." / "We didn't have autism when I was growing up."</em></p>
    <p>Extended family often struggle not because they don't love the child but because it requires updating a worldview. <strong>What helps:</strong> Give them something concrete to do rather than trying to change their overall understanding. "When you visit, give him a five-minute warning before transitions, and if he covers his ears, just reduce the noise." Specific instructions are easier to absorb than explanations of neuroscience. The book <em>Uniquely Human</em> by Barry Prizant is a good starting point for family members who are genuinely interested.</p>
    <h3>Well-meaning friends</h3>
    <p><em>"Have you tried eliminating gluten?" / "I read about this doctor who cures it."</em></p>
    <p><strong>What helps:</strong> "We've got a good team working with us — what I actually need most right now is [specific thing: someone to vent to, help with a task]." This redirects without requiring explanation and gives people who genuinely want to help something they can actually do.</p>
    <h3>Teachers who think it's a discipline problem</h3>
    <p><em>"He does fine when he wants to." / "Some firm boundaries would go a long way."</em></p>
    <p><strong>What helps:</strong> The IEP is your most important tool — it's a legal document that defines accommodations, and non-compliance has consequences. If your child doesn't yet have an IEP, request a special education evaluation in writing. A short "cheat sheet" about your child's communication style and triggers can help a teacher who's genuinely trying.</p>
    <h3>Babysitters and new caregivers</h3>
    <p><strong>What helps:</strong> A written handoff document — one to two pages covering how your child communicates when comfortable vs. dysregulated, what escalation looks like and what to do, which activities are reliably calming, and who to call. Create it once and update it as your child changes.</p>
    <h3>Strangers in public</h3>
    <p><strong>What helps:</strong> You don't owe strangers an explanation. "She has autism — we're managing it" handles the concerned ones. For the judgmental ones, the most energy-efficient response is no response.</p>
    <h2>Protecting Your Own Energy</h2>
    <p>Every explanation you give, every misconception you correct — that's energy from the same reserve you use to be present for your child. You're allowed to decide that some people don't get a full explanation. Spend your educational energy on the people who will actually act on it.</p>
    <TipBox label="Find people who don't need explaining">
      The single most restorative thing many autism parents describe is having at least one person in their life who already gets it. Connecting with a local autism parent support group is one of the most reliable ways to find them.
    </TipBox>
    <SeriesCtaBox />
    <SeriesNav
      prev={{ slug: "after-diagnosis-4-talking-to-clinicians", label: "Talking to Clinicians When You Know More Than They Think" }}
      next={{ slug: "after-diagnosis-6-choosing-childcare-and-therapy", label: "Choosing Childcare and Therapy Providers Who Will Actually Listen" }}
    />
  </div>
);

const Post10Content = () => (
  <div className="prose prose-lg prose-slate max-w-none">
    <IntroBox>
      Credentials are the starting point, not the destination. A provider can be BCBA-supervised, BHCOE-accredited, and insurance-credentialed — and still be wrong for your child if they don't actually incorporate what you know into how they work. Here's how to evaluate providers on the things that actually predict whether the relationship will work.
    </IntroBox>
    <h2>The Intake Call Is the Audition</h2>
    <p>The first phone call tells you more than the website will. Notice who asks the first question and what it is. A provider who starts with "Let me tell you about our program" is different from one who starts with "Tell me about your child."</p>
    <p>Questions that signal a good provider:</p>
    <ul>
      <li>"What have you already figured out about what works for your child?" — signals they intend to build on your knowledge</li>
      <li>"What are your main goals for your child right now — not ours, yours?" — good providers anchor to family priorities</li>
      <li>"How do you involve parents in the therapy?" — family involvement is one of the strongest predictors of outcomes</li>
      <li>"How do you handle it when parents disagree with your approach?" — the answer tells you everything</li>
      <li>"Can I be present during sessions, especially at first?" — there should always be a pathway for you to observe</li>
    </ul>
    <PullQuote>"The first question a good provider asks isn't about your child's deficits. It's about what your child loves."</PullQuote>
    <h2>Types of Providers and What to Look For</h2>
    <p><strong>ABA Therapy Agencies:</strong> Look for regular parent training built into the program, frequent BCBA contact, individualized goals that reflect your child's actual life, and transparent data sharing. <strong>Autism-Trained Nanny Agencies:</strong> Look for RBT certification or documented ABA training, and agencies that vet caregivers on autism-specific skills. <strong>Multi-Disciplinary Clinics:</strong> The question to ask is "How do your clinical teams actually communicate about shared clients?" Proximity in a building is not the same as actual coordination. <strong>Respite Care:</strong> Ask "Do you try to provide consistent staffing for families, or does it vary?" Your child builds relationships with specific people.</p>
    <h2>The First Two Weeks: What to Observe</h2>
    <ul>
      <li>✅ The therapist or caregiver asks you questions at the end of each session</li>
      <li>✅ Your child is willing to engage with this person</li>
      <li>✅ You're being looped in with session notes or progress updates</li>
      <li>❌ The approach looks nothing like what was described in intake</li>
      <li>❌ High staff turnover — your child builds relationships with specific people</li>
      <li>❌ Your concerns are met with reassurance rather than adjustment</li>
    </ul>
    <TipBox label="Get on multiple waitlists simultaneously">
      Starting an intake process doesn't obligate you to anything. If you have three providers you're evaluating, start all three now. If openings come at the same time, you choose the best fit.
    </TipBox>
    <h2>Questions Worth Asking Every Provider</h2>
    <ul>
      <li>What is your BCBA-to-RBT supervision ratio? How often does the BCBA directly observe sessions?</li>
      <li>How do parents participate in goal-setting?</li>
      <li>What does parent training look like — how many hours, how often?</li>
      <li>What's your staff turnover rate? How long do most providers stay with a family?</li>
      <li>Do you coordinate with schools and other providers? What does that look like in practice?</li>
      <li>What's your approach when a child isn't making progress?</li>
    </ul>
    <SeriesCtaBox />
    <SeriesNav
      prev={{ slug: "after-diagnosis-5-when-people-dont-get-it", label: "When People in Your Life Don't Get It" }}
      next={{ slug: "after-diagnosis-7-what-progress-looks-like", label: "What Progress Actually Looks Like" }}
    />
  </div>
);

const Post11Content = () => (
  <div className="prose prose-lg prose-slate max-w-none">
    <IntroBox>
      Clinical progress reports track specific, measurable targets. They're useful, but they only capture a slice of what's actually happening. Parents routinely notice shifts that don't show up in session data for weeks — because they're watching their child all day, across every environment, through the lens of years of observation.
    </IntroBox>
    <PullQuote>"Progress looks different than you think it will. And you'll notice it before anyone else does."</PullQuote>
    <h2>The Progress That Doesn't Make It Into the Report</h2>
    <p><strong>"He's less upset when plans change" — Flexibility and distress tolerance.</strong> A child who used to fall apart for forty-five minutes when something shifted and now recovers in ten minutes has made significant progress. The meltdown isn't gone — but its duration and intensity have changed. That's clinically meaningful. Write it down.</p>
    <p><strong>"She actually looked at me when she said that" — Social referencing.</strong> A glance that lingers half a second longer. A smile that appears to be shared with someone rather than happening privately. These micro-moments are enormous developments in a child for whom social referencing doesn't come automatically. They happen briefly and then they're gone — but they're happening more, and you're the one who notices.</p>
    <p><strong>"He told me he was angry instead of just screaming" — Emotional labeling.</strong> The ability to name an internal state — even imprecisely, even after the fact — is a significant developmental step. This happens first in the safest environments, which is usually home, which is usually with you.</p>
    <p><strong>"She seems more comfortable in her own skin" — Reduced baseline anxiety.</strong> You know what your child's default level of alertness looks like — and when it changes. A child whose resting state becomes less vigilant is a child whose nervous system is finding more regulation.</p>
    <p><strong>"He asked for help instead of shutting down" — Help-seeking and self-advocacy.</strong> This is one of the most valuable skills an autistic person can develop. You'll see it at home first.</p>
    <h2>How to Track It Without Turning Your Life Into a Spreadsheet</h2>
    <p>Some parents keep a brief weekly note on their phone: two or three things they noticed that week, including a "hard" thing and a "better than before" thing. This takes three minutes and produces something genuinely useful at the next clinical meeting.</p>
    <TipBox label="Before every provider meeting">
      Take five minutes to think about one thing that's harder than before and one thing that's better. Bring both. The things that are harder aren't failures — they're information. The best clinical teams want to know about both.
    </TipBox>
    <h2>When Progress Seems to Stall — or Go Backwards</h2>
    <p>Regressions happen. Some common causes: growth spurts and puberty, illness (even mild — the physical experience of being unwell is dysregulating for many autistic children well beyond the illness itself), environmental changes like a new school year or change in caregiver, masking fatigue, and new skills coming online in one area while another temporarily regresses.</p>
    <h2>How to Communicate What You're Seeing</h2>
    <p>Specific language lands better than general language. "She seems better" is hard for a clinician to use. "She recovered from the transition in about ten minutes instead of forty-five" is data. "He looked at my face three times at dinner and smiled when I smiled back" is an observation. The more specific you can be, the more useful your observations become.</p>
    <SeriesCtaBox />
    <SeriesNav
      prev={{ slug: "after-diagnosis-6-choosing-childcare-and-therapy", label: "Choosing Childcare and Therapy Providers Who Will Actually Listen" }}
      next={{ slug: "after-diagnosis-8-diagnosis-was-for-them", label: "The Diagnosis Was for Them" }}
    />
  </div>
);

const Post12Content = () => (
  <div className="prose prose-lg prose-slate max-w-none">
    <IntroBox>
      This is the last post in the After the Diagnosis series, and it's the one that doesn't have a checklist. It's about the thing worth holding onto through all of the appointments and the intake forms and the IEP meetings and the insurance calls: your child is still exactly who they were before anyone named what makes them who they are.
    </IntroBox>
    <p>The diagnosis is a document. It's a billing code, a legal category, a gateway to services. It was written for insurance companies and schools and therapy agencies — for systems that require a label to engage. Your child didn't become autistic when the report was signed. They've been who they are since before you knew them.</p>
    <PullQuote>"The child who came home with you after the evaluation is the same child who left with you that morning. The label changed what the system sees. It didn't change what you know."</PullQuote>
    <h2>What You're Allowed to Feel</h2>
    <p><strong>Relief.</strong> A lot of parents feel relief first, and then feel strange about it — as if relief is somehow a concession, or a lack of love. It isn't. Relief is the natural response to years of sensing that something was different, being told you were wrong, pushing for answers, and finally being believed. The diagnosis is confirmation. That makes complete sense.</p>
    <p><strong>Grief.</strong> Grief is real too, and it doesn't contradict the relief. The grief isn't about your child — it's about the future you had imagined. That future wasn't real, but you had it in your mind, and it's okay to let it go with some sadness. The grief tends to resurface at milestones. Every time it resurfaces, it's a smaller version of the original.</p>
    <p><strong>Anger.</strong> Some parents are angry — at how long it took, at the pediatrician who said to wait and see. That anger is often justified, and it can be useful when directed at the right things: advocacy, navigation, fighting for your child's rights.</p>
    <p><strong>Nothing in particular.</strong> Some parents feel none of the dramatic things. The diagnosis lands and they mostly just keep going — because they were already keeping going. That's also a valid response.</p>
    <h2>The Pressure to Reframe Everything</h2>
    <p>After a diagnosis, there's sometimes external pressure to adopt a particular stance — to grieve publicly, or to celebrate publicly, to commit to cure-focused thinking or neurodiversity-first framing. You don't have to have a position yet. You can hold "my child is wonderful exactly as they are" and "I want their life to be as full and comfortable as possible" at the same time without those things being in conflict.</p>
    <p>The most important view you'll ever have of your child's autism is theirs. That view won't be fully formed for years. You'll learn it from them, over time, the same way you've learned everything else about them — by paying attention.</p>
    <h2>What Actually Helps Families Find Their Footing</h2>
    <p><strong>Finding one person who gets it without needing explanation.</strong> Another autism parent, a friend with a neurodivergent family member. The relief of not having to build from scratch in a conversation is significant. Parent support groups — through Autism NJ, Pathfinders for Autism in Maryland, Autism Delaware — exist for exactly this purpose.</p>
    <p><strong>Letting some things go for a while.</strong> Deciding what doesn't have to happen right now is not avoidance. It's prioritization.</p>
    <p><strong>Going back to what you know.</strong> You know your child. In the middle of the clinical intake process — when your child is being observed and measured and described by strangers — return to the things that are just yours.</p>
    <TipBox label="The one thing worth remembering">
      The diagnosis is a starting point for systems access, not a verdict on your child or your family. The systems will take time to navigate. The people on your child's team will take time to know your child the way you do. None of that time changes anything fundamental about who your child is, or about what you already know about them.
    </TipBox>
    <h2>Looking Ahead</h2>
    <p>The period right after diagnosis tends to feel like the most uncertain. There are a lot of new things to learn, a lot of systems to engage with for the first time. What most parents find, looking back, is that the uncertainty was temporary. The systems become navigable. The team becomes familiar. Your child keeps developing — in their own way, on their own timeline, into more and more of who they are. What doesn't change is the foundation you built before any of this started.</p>
    <SeriesCtaBox />
    <SeriesNav
      prev={{ slug: "after-diagnosis-7-what-progress-looks-like", label: "What Progress Actually Looks Like" }}
    />
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
  // ─── After the Diagnosis Series ──────────────────────────────────────────
  {
    slug: "after-diagnosis-1-diagnosis-doesnt-change-who-your-child-is",
    title: "The Diagnosis Doesn't Change Who Your Child Is — But Here's What It Does Change",
    date: "May 2026",
    readTime: "6 min read",
    excerpt:
      "An autism diagnosis doesn't rewrite who your child is or what you already know about them. Here's what the diagnosis actually changes — and what it finally opens up for your family.",
    tags: ["After the Diagnosis", "New Parents", "Getting Started"],
    content: <Post5Content />,
  },
  {
    slug: "after-diagnosis-2-youve-been-their-best-therapist",
    title: "You've Been Their Best Therapist All Along — What That Means Now",
    date: "May 2026",
    readTime: "6 min read",
    excerpt:
      "Long before any clinician entered the picture, you were already doing the most important work. Here's how to recognize what you've built and use it when you finally have a team.",
    tags: ["After the Diagnosis", "New Parents", "ABA Therapy"],
    content: <Post6Content />,
  },
  {
    slug: "after-diagnosis-3-what-the-diagnosis-unlocks",
    title: "What an Autism Diagnosis Actually Unlocks — Systems, Funding, and Services",
    date: "May 2026",
    readTime: "7 min read",
    excerpt:
      "Insurance coverage, school rights, Medicaid waivers, specialized providers — here's what the diagnosis makes available and how to access each one without feeling overwhelmed.",
    tags: ["After the Diagnosis", "Insurance", "Medicaid Waivers"],
    content: <Post7Content />,
  },
  {
    slug: "after-diagnosis-4-talking-to-clinicians",
    title: "Talking to Clinicians When You Already Know Your Child Better Than They Do",
    date: "May 2026",
    readTime: "6 min read",
    excerpt:
      "Clinicians know autism. You know your child. Here's how to show up in clinical settings with confidence, push back when something is wrong, and make your knowledge shape your child's care.",
    tags: ["After the Diagnosis", "Advocacy", "IEP"],
    content: <Post8Content />,
  },
  {
    slug: "after-diagnosis-5-when-people-dont-get-it",
    title: "When People in Your Life Don't Get It — Family, Schools, Babysitters, and Strangers",
    date: "May 2026",
    readTime: "7 min read",
    excerpt:
      "\"He seems fine to me.\" \"Have you tried being more consistent?\" You've heard it all. Here's how to handle it — from grandparents to strangers to teachers who won't listen.",
    tags: ["After the Diagnosis", "Family Support", "New Parents"],
    content: <Post9Content />,
  },
  {
    slug: "after-diagnosis-6-choosing-childcare-and-therapy",
    title: "Choosing Autism Childcare and Therapy Providers Who Will Actually Listen to You",
    date: "May 2026",
    readTime: "7 min read",
    excerpt:
      "Credentials matter — but so does whether a provider actually listens. Here's how to evaluate providers on fit, communication, and respect for what you already know.",
    tags: ["After the Diagnosis", "ABA Therapy", "Childcare Agencies"],
    content: <Post10Content />,
  },
  {
    slug: "after-diagnosis-7-what-progress-looks-like",
    title: "What \"Progress\" Actually Looks Like — And Why You're Probably Already Seeing It",
    date: "May 2026",
    readTime: "6 min read",
    excerpt:
      "Progress in autism doesn't always look like what the charts measure. Parents see it first and often don't have language for it. Here's how to recognize it and communicate it to your child's team.",
    tags: ["After the Diagnosis", "New Parents", "ABA Therapy"],
    content: <Post11Content />,
  },
  {
    slug: "after-diagnosis-8-diagnosis-was-for-them",
    title: "The Diagnosis Was for Them — Your Child Has Always Been Your Child",
    date: "May 2026",
    readTime: "6 min read",
    excerpt:
      "The diagnosis is for the systems — the insurance companies, the schools, the providers. Your child hasn't changed. Here's the one truth worth holding onto through all of it.",
    tags: ["After the Diagnosis", "New Parents", "Family Support"],
    content: <Post12Content />,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
