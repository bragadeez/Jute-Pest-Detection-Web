import { PestDetails } from '../types';

export const PEST_REGISTRY: Record<string, PestDetails> = {
  'Beet Armyworm': {
    name: 'Beet Armyworm',
    severity: 'High',
    description: 'A destructive, highly mobile caterpillar that feeds aggressively on the foliage of jute plants, often leading to rapid skeletonization of leaves.',
    symptoms: 'Large irregular holes in leaves, skeletonized leaf sections, and visible greenish-brown larvae feeding on under-surfaces.',
    treatment: 'Apply Bacillus thuringiensis (Bt) or Spinosad-based bio-pesticides. Set up pheromone traps to monitor and catch adult moths.'
  },
  'Black Hairy': {
    name: 'Black Hairy',
    severity: 'High',
    description: 'The larvae of this moth are covered in dense black hairs and consume huge amounts of green foliage, leaving only the stem and veins.',
    symptoms: 'Complete defoliation in patches, visible clusters of hairy black-and-orange caterpillars eating leaves in groups.',
    treatment: 'Hand-pick caterpillars using gloves in early stages. Spray Neem Seed Kernel Extract (NSKE) or contact insecticides if infestation spreads.'
  },
  'Cutworm': {
    name: 'Cutworm',
    severity: 'Medium',
    description: 'Ground-dwelling caterpillars that hide in the soil during the day and emerge at night to sever the young jute stems near soil level.',
    symptoms: 'Young jute seedlings cut clean at the base, with wilted seedlings lying on the ground. Caterpillars found curled up in soil near damaged plants.',
    treatment: 'Flood fields to bring cutworms to the surface for predators. Apply neem cake to soil or use chlorpyrifos around the base of plants at dusk.'
  },
  'Field Cricket': {
    name: 'Field Cricket',
    severity: 'Medium',
    description: 'Insects that chew on tender jute seedlings, roots, and stems during the early stages of growth, causing plant death.',
    symptoms: 'Ragged chewing damage at the base of young plant stems, missing seedlings, and small holes in the ground nearby.',
    treatment: 'Keep field boundaries clean to remove cricket breeding sites. Apply bio-rational poison baits containing wheat bran.'
  },
  'Jute Aphid': {
    name: 'Jute Aphid',
    severity: 'Low',
    description: 'Small, soft-bodied, sap-sucking insects that colonize on the shoots and ventral sides of leaves, stunt growth, and secrete sticky honeydew.',
    symptoms: 'Leaf curling, yellowing, sticky leaves due to honeydew secretion, and black sooty mold growing on foliage.',
    treatment: 'Release natural predators like ladybugs. Spray soap-water mixture, neem oil, or apply systemic insecticides if populations surge.'
  },
  'Jute Hairy': {
    name: 'Jute Hairy',
    severity: 'High',
    description: 'A major pest in jute cultivation. Gregarious caterpillars covered in yellowish-orange hairs feed on leaves, leaving plants completely bare.',
    symptoms: 'Leaves skeletonized in patches, large groups of hairy caterpillars feeding on leaves, and branches stripped of leaves.',
    treatment: 'Destroy egg masses and early-stage gregarious caterpillars. Spray contact chemical insecticides or biological solutions like NPV.'
  },
  'Jute Leafhopper': {
    name: 'Jute Leafhopper',
    severity: 'Low',
    description: 'Wedge-shaped tiny green insects that suck sap from leaves and inject toxic saliva, leading to a condition called hopperburn.',
    symptoms: 'Leaf edges turn yellow, curl downwards, and eventually turn brown and dry up (hopperburn effect).',
    treatment: 'Use yellow sticky traps to catch adults. Apply neem oil or spray systemic insecticides like Imidacloprid at early infestation stages.'
  },
  'Jute Red Mite': {
    name: 'Jute Red Mite',
    severity: 'Medium',
    description: 'Tiny red arachnids that feed on the lower surface of leaves, draining sap and chlorophyll, particularly during hot and dry spells.',
    symptoms: 'Reddish or dusty patches on the underside of leaves, yellow speckling on upper surfaces, and thin webbing on leaves.',
    treatment: 'Apply wet sulfur powder or spray specific miticides like Abamectin. Ensure adequate soil moisture to suppress mite breeding.'
  },
  'Jute Semilooper': {
    name: 'Jute Semilooper',
    severity: 'High',
    description: 'One of the most destructive pests. The green looper caterpillar chews leaf margins, damaging the growing apical buds and affecting fiber length.',
    symptoms: 'Leaves with scalloped edges, damaged growing tips (apical buds), and loop-walking green caterpillars visible on foliage.',
    treatment: 'Install bird perches in the field to attract predator birds. Spray Bacillus thuringiensis (Bt) or indoxacarb during early instars.'
  },
  'Jute Stem Girdler': {
    name: 'Jute Stem Girdler',
    severity: 'High',
    description: 'A longicorn beetle that girdles the stem to lay eggs, which stops the flow of nutrients and causes the upper stem to wilt and die.',
    symptoms: 'A ringshaped girdle cut around the stem, with the upper portion of the jute plant wilting, breaking, or drying up.',
    treatment: 'Collect and burn girdled twigs containing eggs. Spray systemic insecticides to target the adult beetles before egg-laying.'
  },
  'Jute Stem Weevil': {
    name: 'Jute Stem Weevil',
    severity: 'High',
    description: 'A small weevil whose larvae bore into the stem, creating galls, weakening the plant, and severely reducing the quality of fiber.',
    symptoms: 'Swelling or gall formation on the stem, small exit holes, fiber staining (blackening), and plants breaking easily in high winds.',
    treatment: 'Practice crop rotation. Uproot and destroy infested plants. Apply granular systemic insecticides to the soil or spray during early growth.'
  },
  'Leaf Beetle': {
    name: 'Leaf Beetle',
    severity: 'Medium',
    description: 'Small metallic beetles that feed on leaves, leaving small shotholes that disrupt photosynthesis and retard jute plant growth.',
    symptoms: 'Small round holes (shotholes) scattered across leaf surfaces, skeletonized patches, and small active beetles visible during sunny hours.',
    treatment: 'Apply neem-based sprays regularly. Practice clean cultivation and hand-pick adults where feasible.'
  },
  'Mealybug': {
    name: 'Mealybug',
    severity: 'Low',
    description: 'Sap-sucking insects covered in a white, waxy protective layer, usually clustering at stem joints and leaf nodes.',
    symptoms: 'White cottony masses on stems and shoots, leaf distortions, stunted shoot growth, and presence of attending ants.',
    treatment: 'Prune and destroy heavily infested branches. Spray water with high pressure, apply neem oil mixed with mild detergent, or use dimethoate.'
  },
  'Pod Borer': {
    name: 'Pod Borer',
    severity: 'Medium',
    description: 'Larvae of moths that target the seed pods of jute plants, feeding on developing seeds and reducing seed crop yields.',
    symptoms: 'Small bore holes in seed pods, presence of caterpillar excreta (frass) on pods, and damaged or empty seed pods.',
    treatment: 'Pheromone traps for adult moths. Apply Spinosad or chlorantraniliprole during the flowering and pod formation stage.'
  },
  'Scopula Emissaria': {
    name: 'Scopula Emissaria',
    severity: 'Medium',
    description: 'A looper caterpillar that feeds on jute foliage, causing defoliation if left unchecked.',
    symptoms: 'Irregular chewing damage along leaf margins, presence of thin brown/green loopers blending in with stems.',
    treatment: 'Set up light traps for moths. Use biological control agents or spray neem seed extract.'
  },
  'Termite': {
    name: 'Termite',
    severity: 'High',
    description: 'Soil-dwelling insects that attack root systems and tunnel upwards into stems, leading to plant collapse, especially in dry seasons.',
    symptoms: 'Wilted plants that pull out of the ground easily due to damaged roots, mud galleries covering the lower stems.',
    treatment: 'Locate and treat termite nests in the vicinity. Apply neem cake or treat soil with chlorpyrifos before sowing.'
  },
  'Termite odontotermes (Rambur)': {
    name: 'Termite odontotermes (Rambur)',
    severity: 'High',
    description: 'A specific aggressive species of mound-building termites that devastate the roots of standing jute crops.',
    symptoms: 'Sudden wilting of mature jute plants in patches, hollowed-out root stems filled with soil, and mud sheeting on roots.',
    treatment: 'Deep summer ploughing to disrupt nests. Use microbial control like Metarhizium anisopliae or soil drenching.'
  },
  'Yellow Mite': {
    name: 'Yellow Mite',
    severity: 'High',
    description: 'Microscopic mites that suck sap from apical buds and young leaves, leading to severe leaf curling, stunting, and coppery leathering.',
    symptoms: 'Youngest leaves curl downwards, become narrow, thicken, and turn dark green or coppery-brown with a leathery texture.',
    treatment: 'Spray lime-sulfur wash, dicofol, or modern acaricides like Spiromesifen. Avoid excessive nitrogen fertilizer applications.'
  }
};

export const getPestDetails = (name: string): PestDetails => {
  return PEST_REGISTRY[name] || {
    name: name,
    severity: 'Medium',
    description: 'An identified pest affecting the health of jute crops. Monitor fields regularly for signs of spread.',
    symptoms: 'Foliar damage, discoloration, or stem abnormalities typical of insect or mite activity.',
    treatment: 'Isolate affected plants. Apply general organic neem sprays and seek advice from local agricultural extension services.'
  };
};
export default getPestDetails;
