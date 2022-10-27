const deptList = [`A HTG`, `ACC`, `AEROS`, `AFRIK`, `AM ST`, `ANES`, `ANTHR`, `ARAB`, `ARMEN`, `ART`, `ARTED`, `ARTHC`, `ASIAN`, `ASL`, `BIO`, `BULGN`, `C S`, `CANT`, `CCE`, `CE`, `CEBU`, `CELL`, `CFM`, `CH EN`, `CHEM`, `CHIN`, `CL CV`, `CLSCS`, `CMLIT`, `CMPST`, `COMD`, `COMMS`, `CPSE`, `CREOL`, `CROAT`, `CSANM`, `DANCE`, `DANSH`, `DES`, `DESAN`, `DESGD`, `DESIL`, `DESPH`, `DIGHT`, `DUTCH`, `EC EN`, `ECE`, `ECON`, `EDLF`, `EIME`, `EL ED`, `ELING`, `EMBA`, `ENG T`, `ENGL`, `ENT`, `ESL`, `ESTON`, `EUROP`, `EXDM`, `EXSC`, `FHSS`, `FIJI`, `FIN`, `FINN`, `FLANG`, `FNART`, `FREN`, `GEOG`, `GEOL`, `GERM`, `GREEK`, `GSCM`, `GWS`, `HAWAI`, `HCOLL`, `HEB`, `HILIG`, `HINDI`, `HIST`, `HLTH`, `HMONG`, `HONRS`, `HRM`, `IAS`, `ICLND`, `ICS`, `IHUM`, `INDES`, `INDON`, `IP&T`, `IS`, `IT&C`, `ITAL`, `JAPAN`, `KHMER`, `KICHE`, `KOREA`, `LATIN`, `LATVI`, `LAW`, `LFSCI`, `LING`, `LITHU`, `LT AM`, `M COM`, `MALAG`, `MARSH`, `MATH`, `MBA`, `MDT`, `ME EN`, `MESA`, `MFGEN`, `MFHD`, `MFT`, `MIL S`, `MKTG`, `MMBIO`, `MPA`, `MSB`, `MTHED`, `MUSIC`, `NAVAJ`, `NDFS`, `NE LG`, `NES`, `NEURO`, `NORWE`, `NURS`, `PERSI`, `PETE`, `PHIL`, `PHSCS`, `PHY S`, `PLANG`, `POLI`, `POLSH`, `PORT`, `PSYCH`, `PWS`, `QUECH`, `REL A`, `REL C`, `REL E`, `ROM`, `RUSS`, `SAMOA`, `SC ED`, `SCAND`, `SFL`, `SLAT`, `SLN`, `SLOVK`, `SOC`, `SOC W`, `SPAN`, `SRBIA`, `STAC`, `STAT`, `STDEV`, `STRAT`, `SWAHI`, `SWED`, `SWELL`, `T ED`, `TAGAL`, `TECH`, `TEE`, `TELL`, `TES`, `TEST`, `THAI`, `TMA`, `TONGA`, `TURK`, `UKRAI`, `UNIV`, `VIET`, `WELSH`, `WRTG`]

export const validateDept = (dept) => {

	if (deptList.indexOf(dept) !== -1) return true
	else return false
}

export const validateCourse = (course) => {
	// || course == ''
	if (course.match(/^\d{3}[A-Z]?$/) && course.indexOf(` `) === -1) return true
	else return false
}

export const validateSection = (section) => {
	// || section == ''
	if (section.match(/^\d{3}$/)) return true
	else return false
}
