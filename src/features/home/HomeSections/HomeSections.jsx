import Section from '@/components/layout/Section/Section'
import ParallaxText from '@/components/home/ParallaxText/ParallaxText'
import WorldMapGrid from '@/components/home/WorldMapGrid/WorldMapGrid'
import Accordion from '@/components/ui/Accordion/Accordion'
import LifelongImpact from '@/components/home/LifelongImpact/LifelongImpact'
import Zeladoria from '@/components/home/Zeladoria/Zeladoria'
import { getManifestoText } from '@/data/manifesto'

const sections = [
      {
        id: 'home',
        title: '[ DESENVOLVEMOS SOLUÇÕES DIGITAIS ]',
        text: '',
        delay: 0,
        headerContent: <ParallaxText />
      },
  {
    id: 'disclaimer',
    title: '[ DISCLAIMER ]',
    text: getManifestoText('disclaimer.full_text'),
    delay: 200,
    backgroundColor: '#000000',
    gridLayout: true,
    consoleStyle: true,
    topLeftText: getManifestoText('about.school_definition'),
    topRightText: getManifestoText('about.mission_integration'),
    bottomRightText: getManifestoText('about.mission_integration') // Based on previous hardcoded value which was a repeat or similar
  },
  {
    id: 'plano-de-voo',
    title: '[ MISSÃO ]',
    text: getManifestoText('mission.diagnosis'),
    delay: 400,
    backgroundContent: <WorldMapGrid />,
    sectionTitle: <>PLANO DE<br />VÔO</>,
    twoColumns: true,
    consoleStyle: true,
    firstColumnText: getManifestoText('mission.diagnosis'), // Simplified for now, original had forced line breaks
    secondColumnText: getManifestoText('mission.squad_formation')
  },
  {
    id: 'processo',
    title: '',
    text: '',
    delay: 500,
    sectionTitle: <>COMO<br />FUNCIONA</>,
    customContent: <Accordion />
  },
  {
    id: 'lifelong-impact',
    title: '',
    text: '',
    delay: 1200,
    backgroundColor: 'rgb(5,178,193)',
    customContent: <LifelongImpact />
  },
  {
    id: 'zeladoria',
    title: '',
    text: '',
    delay: 1400,
    backgroundColor: 'rgb(5,178,193)',
    customContent: <Zeladoria />
  }
]

function HomeSections() {
  return (
    <>
      {sections.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          text={section.text}
          secondParagraph={section.secondParagraph}
          delay={section.delay}
          backgroundColor={section.backgroundColor}
          headerContent={section.headerContent}
          twoColumns={section.twoColumns}
          firstColumnText={section.firstColumnText}
          secondColumnText={section.secondColumnText}
          gridLayout={section.gridLayout}
          topLeftText={section.topLeftText}
          topRightText={section.topRightText}
          bottomRightText={section.bottomRightText}
          backgroundContent={section.backgroundContent}
          sectionTitle={section.sectionTitle}
          consoleStyle={section.consoleStyle}
          customContent={section.customContent}
        />
      ))}
    </>
  )
}

export default HomeSections
