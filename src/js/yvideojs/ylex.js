import { Fragment as F } from 'react'

class YLex {
	getReprRenderer = name => <F>
		{name === `WAV` ?
			value => <audio controls><source src={value} type='audio/wav' /></audio>
			:
			value
		}
	</F>

	processRepr = (name, values) => {
		const renderer = getReprRenderer(name)
		return values.map(renderer).join(`, `)
	}

	renderSense = sense => {
		return <F>
			{sense.definition}
			{sense.examples &&
				sense.examples.length &&
				<F><br /><i>Examples:</i>{sense.examples.map(s => <F><br />{s}</F>)}</F>}
			{sense.notes &&
				sense.notes.length &&
				<F><br /><i>Notes:</i>{sense.notes.map(s => <F><br />{s}</F>)}</F>}
		</F>
	}

	renderLemma = lemma => {

		const prefRep = lemma.representations[0],
			lemmaForm = lemma.forms[lemma.lemmaForm],
			repList = Object.keys(lemmaForm),
			formList = Object.keys(lemma.forms)

		return (
			<F>
				<b>{processRepr(prefRep, lemmaForm[prefRep])}</b>
				{repList.length > 1 &&
					<dl>
						{repList.map(repr => {
							repr === prefRep &&
								<F>
									<dt>{repr}</dt>
									<dd>{processRepr(repr, lemmaForm[repr])}</dd>
								</F>
						})}
					</dl>
				}
				{lemma.pos &&
					<div>{lemma.poss}</div>
				}
				{formList.length > 1 &&
					<F><div><i>Other Forms:</i><dl>
						{formList.map(fname => {
							const form = lemma.forms[fname]
							fname === lemma.lemmaForm &&
								<F><dt>{fname}</dt><dd>
									{repList.length > 1 ?
										<dl>
											{Object.keys(form).map(repr =>
												<F>
													<dt>{repr}</dt>
													<dd>{processRepr(repr, form[repr])}</dd>
												</F>)}
										</dl>
										:
										<F>{processRepr(repList[0], form[repList[0]])}</F>
									}
								</dd></F>
						})}
					</dl></div></F>
				}
				{lemma.senses && lemma.senses.length &&
					<div>
						<ol>
							{lemma.senses.map(sense => {
								<li>{sense}</li>
							})}
						</ol>
					</div>
				}
				{lemma.sources.map(source => <F>
					<div class='source'>{source.attribution}</div>
					<br />
				</F>)
				}
			</F>
		)
	}

	renderWord = (text, word) => <F>
		<b>{text.substring(word.start, word.end)}</b>
		<ol>
			{word.lemmas.map(lemma => {
				<li>{lemma}</li>
			})}
		</ol>
	</F>

	renderResult = result => <F>
		<div class='sourceText'><b>Original Text:</b> {result.text}</div>
		{result.translations &&
			<div class='translationResult'>
				<b>Free Translations:</b>
				<div class='translations'>
					{result.translations.map(trans => {
						<F>
							"{trans.text}"
								<div class='source'>
								{trans.source.attribution}
							</div>
						</F>
					})}
				</div>
			</div>
		}
		{result.words &&
			<div class='translationResult'>
				<b>Definitions:</b>
				<div class='translations'>
					{result.words.map(word => renderWord(result.text, word))}
				</div>
			</div>
		}
	</F>

}

export default YLex
