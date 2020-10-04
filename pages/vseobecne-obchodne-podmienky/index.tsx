import React from 'react';
import Layout from '../../app-data/shared/components/Layout/Site.layout';
import { withSetCart } from '../../app-data/lib/state/Reducer';
import {
  Wrapper,
  H1,
  P,
  H2,
  LI,
} from '../../app-data/shared/styles/components/Documents';
import { Container } from 'reactstrap';
import Link from 'next/link';

const VOP: () => JSX.Element = () => (
  <Layout>
    <Wrapper>
      <Container>
        <H1>Všeobecné obchodné podmienky</H1>

        <ol>
          <H2 className="text-left">
            A. Všeobecné ustanovenia a vymedzenie pojmov
          </H2>
          <LI>
            Tieto všeobecné obchodné podmienky (ďalej len „VOP“) sa vzťahujú na
            právne vzťahy medzi kupujúcim alebo spotrebiteľom a prevádzkovateľom
            internetového obchodu www.eshop.kupelecks.sk, ktorým je spoločnosť
            AMICUS RELAX, s.r.o., so sídlom Popradská 6, 064 01 Stará Ľubovňa,
            Slovenská republika, IČO: 36 849 987, DIČ: 2022474025, IČ DPH:
            SK2022474025, registrovaná v Obchodnom registri vedenom Okresným
            súdom Prešov, odd. Sro, vložka č. 19260/P, email:
            <a href="mailto: eshopoffice@kupelecks.sk">
              eshopoffice@kupelecks.sk
            </a>
            , tel. číslo: 000/000000 (ďalej len „predávajúci“).
          </LI>
          <LI>
            Na právne vzťahy predávajúceho so spotrebiteľmi sa vzťahujú okrem
            všeobecných ustanovení zákona č. 40/1964 Zb. Občiansky zákonník, v
            platnom znení, aj ďalšie právne predpisy, a to najmä zákon č.
            102/2014 Z. z. o ochrane spotrebiteľa pri predaji tovaru alebo
            poskytovaní služieb na základe zmluvy uzavretej na diaľku alebo
            zmluvy uzavretej mimo prevádzkových priestorov predávajúceho a o
            zmene a doplnení niektorých zákonov, v platnom znení, zákon č.
            250/2007 Z. z. o ochrane spotrebiteľa a o zmene zákona Slovenskej
            národnej rady č. 372/1990 Zb. o priestupkoch, v platnom znení, ako
            aj zákon č. 22/2004 Z. z. o elektronickom obchode a o zmene a
            doplnení zákona č. 128/2002 Z. z. o štátnej kontrole vnútorného trhu
            vo veciach ochrany spotrebiteľa a o zmene a doplnení niektorých
            zákonov v znení zákona č. 284/2002 Z. z., v platnom znení. Na právne
            vzťahy predávajúceho s právnickými osobami, resp. s fyzickými
            osobami – podnikateľmi, sa vzťahujú najmä ustanovenia zákona č.
            513/1191 Zb. Obchodný zákonník, v platnom znení.
          </LI>
          <LI>
            Internetová stránka www.eshop.kupelecks.sk (ďalej len „stránka“
            alebo „obchod“) je internetový obchod zameraný na predaj tovarov
            kupujúcim alebo spotrebiteľom.
          </LI>
          <LI>
            Tovar je tovar, produkt alebo služba, ktoré tvoria ponuku
            predávajúceho pre nákup prostredníctvom obchodu.
          </LI>
          <LI>
            Kupujúci je podnikateľ (fyzická osoba alebo právnická osoba), ktorý
            odoslal po vlastnej autorizácii elektronickú objednávku spracovanú
            elektronickým systémom obchodu.
          </LI>
          <LI>
            Spotrebiteľ je fyzická osoba, ktorá pri uzatváraní a plnení
            spotrebiteľskej zmluvy nekoná v rámci predmetu svojej obchodnej
            činnosti alebo inej podnikateľskej činnosti a ktorá odoslala po
            vlastnej autorizácii elektronickú objednávku spracovanú
            elektronickým systémom obchodu.
          </LI>
          <LI>Zákazník je kupujúci alebo spotrebiteľ.</LI>
          <LI>
            Elektronická objednávka je odoslaný elektronický formulár obsahujúci
            informácie o zákazníkovi, zoznam objednaného tovaru z ponuky obchodu
            a cenu tohto tovaru, spracovaný elektronickým systémom obchodu.
          </LI>
          <LI>
            Tovar zhotovený podľa osobitných požiadaviek zákazníka, je tovar,
            ktorý bol špeciálne objednaný od dodávateľa predávajúceho pre
            konkrétneho zákazníka na základe špecifikácie danej zákazníkom, za
            ktorý bol predávajúcim od zákazníka vyžiadaný peňažný preddavok na
            zaplatenie kúpnej ceny.
          </LI>
          <LI>
            Odberným miestom je AMICUS RELAX, s.r.o., Popradská 6, 064 01 Stará
            Ľubovňa, Slovenská republika.
          </LI>
          <LI>
            Internetovým prehliadaním alebo používaním stránky každý zákazník
            potvrdzuje, že akceptujete tieto VOP. V prípade, že právne predpisy
            poskytujú spotrebiteľovi väčší rozsah práv a širšiu ochranu ako
            tieto VOP, tak sa prednostne použije táto zákonná právna úprava,
            namiesto úpravy v týchto VOP. Rovnako sa na právny vzťah medzi
            predávajúcim a spotrebiteľom použije zákonná úprava vtedy, ak je to
            pre spotrebiteľa výhodnejšie. Zákazník je povinný sa oboznámiť s
            týmito VOP pred začatím používania stránky.
          </LI>
          <LI>
            Tieto VOP bližšie upravujú a určujú práva a povinnosti
            predávajúceho, kupujúceho alebo spotrebiteľa, a vo svojom aktuálnom
            znení tvoria neoddeliteľnú súčasť kúpnej zmluvy.
          </LI>
          <H2 className="text-left">
            B. Elektronická objednávka, uzavretie kúpnej zmluvy
          </H2>
          <LI>
            Podmienkou platnosti elektronickej objednávky je pravdivé a úplné
            vyplnenie všetkých, registračným formulárom požadovaných údajov a
            informácií zákazníkom. Spotrebiteľ v objednávke ďalej uvedie meno a
            priezvisko, adresu bydliska a dodaciu adresu, ak je iná ako adresa
            bydliska, telefónne číslo a emailová adresa. Kupujúci v objednávke
            uvedie: obchodné meno, sídlo, dodaciu adresu, ak sa líši od adresy
            sídla, IČO, DIČ, IČ DPH (ak je pridelené), telefónne číslo a
            emailová adresa. Súčasťou elektronickej objednávky je aj presné
            označenie objednávaného tovaru podľa jeho špecifikácie na stránke, s
            uvedením počtu, spôsobu zaplatenia a spôsobu doručenia a prevzatia
            tovaru, pričom tieto náležitosti elektronickej objednávky sa
            uskutočňujú automaticky po vložení tovaru do e-košíka.
          </LI>
          <LI>
            Všetky prijaté elektronické objednávky sú považované predávajúcim za
            nezáväzný návrh zákazníka na uzavretie kúpnej zmluvy. Oznámenie o
            prijatí objednávky do elektronického systému predávajúceho, ktoré
            zákazník dostane na svoju emailovú adresu ihneď po odoslaní jeho
            elektronickej objednávky, sa nepovažuje za záväzné akceptovanie
            objednávky predávajúcim. Toto oznámenie má len informatívny
            charakter za účelom upovedomenia zákazníka o prijatí jeho
            elektronickej objednávky predávajúcim. Toto oznámenie obsahuje
            celkové zhrnutie objednávky a prípadné poučenia zákazníka.
          </LI>
          <LI>
            K akceptácii elektronickej objednávky tovaru predávajúcim, a teda k
            uzavretiu kúpnej zmluvy medzi predávajúcim a kupujúcim alebo medzi
            predávajúcim a spotrebiteľom, dochádza doručením elektronického
            potvrdenia zaslaného na emailovú adresu zákazníka (email o stave
            objednávky).
          </LI>
          <LI>
            Predávajúci si vyhradzuje právo na dodatočnú úpravu ceny objednaného
            tovaru (predávajúci negarantuje cenu tovaru, ktorá je uvedená v
            ponuke obchodu v čase uskutočnenia elektronickej objednávky, nakoľko
            je cena tovaru závislá od možnej zmeny dodávateľských cien daného
            tovaru). V prípade dodatočnej úpravy kúpnej ceny objednaného tovaru
            dochádza k uzavretiu kúpnej zmluvy akceptáciou zmenenej kúpnej ceny
            zákazníkom, odoslanou elektronickou poštou na emailovú adresu
            predávajúceho. Ak zákazník zmenenú kúpnu cenu neakceptuje, kúpna
            zmluva medzi predávajúcim a kupujúcim alebo medzi predávajúcim a
            spotrebiteľom nevznikne.
          </LI>
          <LI>
            Po uzavretí kúpnej zmluvy je zákazník povinný zaplatiť kúpnu cenu
            (vrátane všetkých nákladov na balné a poštovné), ak kúpnu cenu už
            nezaplatil v procese elektronickej objednávky, a následne je
            predávajúci povinný dodať zákazníkovi objednaný tovar.
          </LI>
          <H2 className="text-left">C. Dodacie podmienky</H2>
          <LI>
            Miestom plnenia zmluvy sa rozumie miesto dodania uvedené zákazníkom
            v registračnom formulári obchodu. Tovar bude dodaný predávajúcim s
            využitím služieb tretích subjektov (podnik poštovej prepravy,
            kuriérska služba) alebo predávajúci dodá tovar vlastnými
            prostriedkami, alebo na základe dohody so zákazníkom bude tovar
            pripravený na prevzatie zákazníkom u vopred dohodnutého subjektu
            alebo na odbernom mieste.
          </LI>
          <LI>
            Tovar sa považuje za dodaný okamihom, keď zákazník, alebo ním určená
            tretia osoba s výnimkou dopravcu, prevezme všetky časti objednaného
            tovaru, alebo:
            <ol type="a">
              <LI>
                ak sa tovary objednané zákazníkom v jednej objednávke dodávajú
                oddelene, okamihom prevzatia tovaru, ktorý bol dodaný ako
                posledný,
              </LI>
              <LI>
                ak sa dodáva tovar pozostávajúci z viacerých dielov alebo kusov,
                okamihom prevzatia posledného dielu, alebo kusu,
              </LI>
              <LI>
                ak sa dodáva tovar opakovane počas vymedzeného obdobia, okamihom
                prevzatia prvého dodaného tovaru.
              </LI>
            </ol>
          </LI>
          <LI>
            Vlastnícke právo k tovaru prechádza na zákazníka dodaním tovaru a
            zaplatením kúpnej ceny v plnej výške. Do doby prechodu vlastníckych
            práv z predávajúceho na zákazníka, ktorý má výrobky a služby v
            držbe, má zákazník všetky povinnosti uschovávateľa veci a je povinný
            výrobky a služby na vlastné náklady bezpečne uschovať a označiť ich
            tak, aby boli za každých okolností identifikovateľné ako tovar
            predávajúceho.
          </LI>
          <LI>
            Predávajúci dodá tovar zákazníkovi v čo možno najkratšej dobe po tom
            ako bude platba celej kúpnej ceny, vrátane úhrady prepravných
            nákladov za objednaný tovar, prijatá na účet predávajúceho; dodacie
            lehoty sú uvedené na stránke. Zákazník berie na vedomie, že pri
            plnení záväzkov predávajúceho majú uvádzané termíny dodávok len
            orientačný charakter. Zákazník súhlasí s predĺžením dodacej lehoty v
            prípade, ak si to výroba objednaného tovaru alebo iné okolnosti
            vyžiadajú. V prípade, že predávajúci nie je schopný dodať
            zákazníkovi všetok objednaný tovar v dohodnutej lehote, upovedomí
            predávajúci o tejto veci v čo najkratšom čase zákazníka a oznámi mu
            predpokladaný termín dodania objednaného tovaru alebo mu navrhne
            dodanie alternatívneho tovaru.
          </LI>
          <LI>
            Tovar je pri doprave bezpečne zabalený. Pri preberaní tovaru je
            zákazník povinný skontrolovať fyzickú neporušenosť a kompletnosť
            zásielky a tieto potvrdiť na prepravnom liste. Pokiaľ je zásielka
            viditeľne poškodená, zničená alebo nekompletná, zákazník je povinný
            bez prevzatia zásielky ihneď kontaktovať predávajúceho; pri doručení
            tovaru kuriérom alebo podnikom poštovej prepravy je zákazník povinný
            spísať o týchto skutočnostiach protokol. Akékoľvek neskoršie
            reklamácie zákazníka na množstvo a fyzické porušenie tovaru nebudú
            predávajúcim akceptované. Prepravné náklady nie sú zahrnuté v kúpnej
            cene tovaru. Výška úhrady prepravných nákladov sa určuje podľa
            platného cenníka uvedeného na stránke prepravcu. Objednávky sa
            realizujú okamžite v prípade, že je tovar na sklade. V prípade, že
            sa tovar nedistribuoval z dôvodu nedostatku na sklade, distribuuje
            sa okamžite po jeho dodaní na sklad.
          </LI>
          <LI>
            Predávajúci je oprávnený požadovať splnenie záväzkov, najmä
            uhradenie kúpnej ceny za tovar, a to bez ohľadu na to, že
            vlastníctvo tovaru a služieb ešte neprešlo na zákazníka.
            Nebezpečenstvo škody na tovare prechádza na zákazníka momentom
            prevzatia tovaru zákazníkom alebo jeho splnomocnencom.
          </LI>
          <LI>
            Predávajúci dodá zákazníkovi najneskôr spolu s tovarom v písomnej
            alebo elektronickej podobe všetky doklady potrebné na prevzatie a
            užívanie tovaru a ďalšie doklady predpísané platnými právnymi
            predpismi.
          </LI>
          <LI>
            V prípade niektorých skupín tovarov (napr. tovar nad 30 kg a tovar
            väčších rozmerov) si predávajúci vyhradzuje právo zmeniť cenu za
            dodanie tovaru prepravcom, o čom bude predávajúci informovať
            zákazníka telefonicky alebo elektronicky na emailovú adresu
            zákazníka pred uzavretím kúpnej zmluvy.
          </LI>
          <LI>
            V prípade dodania tovaru do zahraničia budú dodacie a platobné
            podmienky medzi predávajúcim a zákazníkom dohodnuté individuálne.
          </LI>
          <LI>
            Zákazník uvedie v elektronickej objednávke formu, akou mu má byť
            objednaný tovar dodaný. V prípade, že si zákazník zvolí osobné
            prevzatie tovaru, tak tento tovar si môže zákazník prevziať až po
            doručení emailovej správy od predávajúceho zaslanej zákazníkovi na
            jeho emailovú adresu, v ktorej predávajúci potvrdí zákazníkovi, že
            tovar je pripravený na prevzatie na odbernom mieste.
          </LI>
          <LI>
            Podrobnosti prepravy tovaru odoslaného zákazníkovi prostredníctvom
            podnikom poštovej prepravy alebo kuriérom sa spravujú prepravným
            poriadkom podniku poštovej prepravy alebo kuriérskej služby.
          </LI>
          <LI>
            Ak zákazník nezaplatí kúpnu cenu a neprevezme si tovar osobne ani do
            30 dní odo dňa doručenia emailovej správy podľa bodu 27. tohto
            článku C., tak platí, že zákazník od kúpnej zmluvy odstúpil, čím sa
            elektronická objednávka zrušuje od počiatku. V ostatných prípadoch,
            ak zákazník neprevezme objednaný tovar a aj prípadné ďalšie snahy
            predávajúceho o doručenie objednaného tovaru zostanú bezvýsledné,
            predávajúci má právo požadovať od zákazníka uhradenie poplatku za
            uskladnenie tovaru vo výške 1 € denne. Toto právo vzniká
            predávajúcemu odo dňa nasledujúceho po dni vrátenia tovaru
            predávajúcemu z dôvodu neprevzatia tovaru zákazníkom. Ak zákazník
            ani po dodatočných 30 dňoch neprevezme tovar, predávajúci má právo
            tovar ďalej predať tretím osobám a z výťažku z predaja tohto tovaru
            si voči zákazníkovi započítať poplatok za uskladnenie tovaru a
            všetky náklady, ktoré predávajúcemu vznikli v dôsledku neprevzatia
            tovaru zákazníkom.
          </LI>
          <H2 className="text-left">D. Kúpna cena</H2>
          <LI>
            Ceny tovarov uvedené na stránke platia výhradne na nákup
            prostredníctvom stránky. Súčasťou ceny tovarov uvedenej na stránke
            nie sú náklady na dodanie tovaru, balné ani žiadne iné dodatočné
            náklady predávajúceho, pokiaľ nie je výslovne uvedené inak v popise
            tovaru na stránke.
          </LI>
          <LI>
            Zvýhodnené (akciové) ceny a ponuky tovaru sú zreteľne označené
            symbolom „akcia“ alebo „výpredaj“. Platnosť zvýhodnených cien trvá
            do vypredania zásob alebo do doby výslovne uvedenej na stránke pri
            zvýhodnenej cene.
          </LI>
          <LI>
            Zákazník má možnosť uhradiť kúpnu cenu vrátane ďalších nákladov na
            dodanie tovaru, poštovného a balného, prípadne iných poplatkov: a)
            priamou platbou na bankový účet predávajúceho (na základe faktúry,
            ktorá bude zákazníkovi doručená na emailovú adresu zákazníka aj s
            platobnými údajmi), pričom tovar bude zaslaný zákazníkovi až po
            pripísaní príslušnej sumy na bankový účet predávajúceho, avšak len
            za predpokladu, že stránka túto možnosť platby ponúka b) cez
            platobnú bránu (platobnou kartou), pričom tovar bude zaslaný
            zákazníkovi až po potvrdení o zaplatení príslušnej sumy za tovar.
          </LI>
          <H2 className="text-left">
            E. Záruka, zodpovednosť za vady a reklamácie
          </H2>
          <LI>
            Tieto reklamačné podmienky sa vzťahujú na produkty zakúpené u
            predávajúceho: AMICUS RELAX, s.r.o., so sídlom Popradská 6, 064 01
            Stará Ľubovňa, Slovenská republika, IČO: 36 849 987, DIČ:
            2022474025, IČ DPH: SK2022474025, registrovaná v Obchodnom registri
            vedenom Okresným súdom Prešov, odd. Sro, vložka č. 19260/P.
          </LI>
          <LI>
            Záručná doba (doba minimálnej spotreby) tovaru je vyznačená na obale
            tovaru. V ostatných prípadoch platí všeobecná záručná doba v dĺžke
            24 mesiacov odo dňa prevzatia tovaru.
          </LI>
          <LI>
            Zákazník sa zaväzuje, že ihneď po prevzatí tovaru tovar dôkladne
            prezrie, a ak má tovar vady, túto skutočnosť bezodkladne písomne
            (e-mailom) oznámi predávajúcemu. Ak sa vada tovaru objaví v záručnej
            dobe, môže zákazník tento tovar reklamovať; musí tak však spraviť
            bezodkladne po vyskytnutí sa takej vady. Ak bude vada tovaru
            predávajúcemu oznámená neskôr, predávajúci takúto reklamáciu neuzná
            (týka sa to najmä vád, ktoré by mohli vzniknúť pri používaní
            tovaru).
          </LI>
          <LI>
            Zákazník je oprávnený uplatniť si u predávajúceho práva zo záruky
            len na tovar zakúpený u predávajúceho a len na tovar, ktorý má vady
            spôsobené výrobcom, dodávateľom alebo predávajúcim.
          </LI>
          <LI>
            Spotrebiteľ je oprávnený uplatniť si reklamáciu u predávajúceho:{' '}
            <ol type="a">
              <LI>
                elektronickou formou na emailovej adrese:{' '}
                <a href="mailto: eshopoffice@kupelecks.sk">
                  eshopoffice@kupelecks.sk
                </a>
                , alebo
              </LI>
              <LI>
                písomnou formou na adrese: AMICUS RELAX, s.r.o., Popradská 6,
                064 01 Stará Ľubovňa, Slovenská republika.
              </LI>
            </ol>
          </LI>
          <LI>
            Reklamačné konanie na tovar, ktorý možno doručiť, sa začína v deň,
            kedy budú kumulatívne splnené nasledovné podmienky:
            <ul>
              <LI>
                predávajúcemu bolo doručené uplatnenie reklamácie vady zo strany
                spotrebiteľa,
              </LI>
              <LI>
                predávajúcemu bol doručený vadný tovar spolu s jeho
                príslušenstvom (dodacím listom alebo záručným listom, dokladom o
                zaplatení kúpnej ceny a ostatnej dokumentácie, vrátane návodu k
                tovaru),
              </LI>
              <LI>
                predávajúcemu bola poskytnutá súčinnosť so strany spotrebiteľa,
                ak je potrebná na uplatnenie a vybavenie reklamácie vadného
                tovaru.
              </LI>
            </ul>
          </LI>
          <LI>
            Reklamačné konanie na tovar, ktorý objektívne nemožno doručiť, sa
            začína v deň, kedy budú kumulatívne splnené nasledovné podmienky:
            <ul>
              <LI>
                predávajúcemu bolo doručené uplatnenie reklamácie vady zo strany
                spotrebiteľa,
              </LI>
              <LI>
                bola vykonaná obhliadka tovaru predávajúcim alebo ním poverou
                osobou,
              </LI>
              <LI>
                predávajúcemu bola poskytnutá súčinnosť so strany spotrebiteľa,
                ak je potrebná na uplatnenie a vybavenie reklamácie vadného
                tovaru.
              </LI>
            </ul>
          </LI>
          <LI>
            Predávajúci sa zaväzuje vybaviť reklamáciu spotrebiteľa do 30 dní od
            začatia reklamačného konania a to v súlade s ustanoveniami zákona č.
            250/2007 Z. z. o ochrane spotrebiteľa a o zmene zákona Slovenskej
            národnej rady č. 372/1990 Zb. o priestupkoch, v platnom znení.
            Predávajúci vopred informuje spotrebiteľa, ak je potrebné predĺžiť
            dobu na vyriešenie reklamácie pri tovaroch, ktoré je nutné zaslať na
            opravu výrobcovi, alebo je potrebné odborné (znalecké) posúdenie
            reklamovanej vady. Reklamačná doba sa tak primerane predlžuje. V
            každom prípade má spotrebiteľ právo odstúpiť od zmluvy, alebo žiadať
            výmenu tovaru, ak by reklamácia presiahla 30 dní a spotrebiteľ
            nebude súhlasiť s predĺžením reklamačnej lehoty.
          </LI>
          <LI>
            Predávajúci nie je zodpovedný za vadu tovaru a reklamáciu nemožno
            uplatniť, ak k vade tovaru došlo v dôsledku nesprávneho
            zaobchádzania s tovarom, nesprávneho používania tovaru, mechanického
            poškodenia, prevádzkou v nevhodných podmienkach alebo neoprávneným
            zásahom do výrobku; za takéto vady v plnej miere zodpovedá sám
            zákazník. Zo záruky sú tiež vyňaté vady tovaru spôsobené živelnou
            pohromou.
          </LI>
          <LI>
            Nárok na uplatnenie reklamácie počas trvania záruky u predávajúceho
            zaniká:
            <ul>
              <LI>
                nepredložením dokladu o zaplatení a inej súvisiacej
                dokumentácie,
              </LI>
              <LI>
                neoznámením zjavných nedostatkov a vád tovaru pri prevzatí
                tovaru zákazníkom,
              </LI>
              <LI>uplynutím záručnej doby tovaru,</LI>
              <LI>mechanickým poškodením tovaru spôsobeným zákazníkom,</LI>
              <LI>
                používaním tovaru zákazníkom v podmienkach, ktoré nezodpovedajú
                svojou vlhkosťou, chemickými a mechanickými vplyvmi prirodzenému
                prostrediu,
              </LI>
              <LI>
                neodborným zaobchádzaním, obsluhou alebo zanedbaním
                starostlivosti o tovar,
              </LI>
              <LI>
                poškodením tovaru neodvrátiteľnými alebo nepredvídateľnými
                udalosťami,
              </LI>
              <LI>poškodením tovaru náhodnou skazou a náhodným zhoršením,</LI>
              <LI>
                neodborným zásahom, poškodením pri doprave, poškodením vodou,
                ohňom, statickou či atmosférickou elektrinou alebo iným zásahom
                vyššej moci.
              </LI>
            </ul>
          </LI>
          <LI>
            Ak spotrebiteľ reklamáciu tovaru uplatní počas prvých 12 mesiacov od
            kúpy, môže predávajúci vybaviť reklamáciu zamietnutím len na základe
            odborného posúdenia; bez ohľadu na výsledok odborného posúdenia
            nemožno od spotrebiteľa vyžadovať úhradu nákladov na odborné
            posúdenie ani iné náklady súvisiace s odborným posúdením.
            Predávajúci je povinný poskytnúť spotrebiteľovi kópiu odborného
            posúdenia odôvodňujúceho zamietnutie reklamácie najneskôr do 14 dní
            odo dňa vybavenia reklamácie.
          </LI>
          <LI>
            Ak spotrebiteľ reklamáciu tovaru uplatnil po 12 mesiacoch od kúpy a
            predávajúci ju zamietol, tak v doklade o vybavení reklamácie
            predávajúci uvedie, komu môže spotrebiteľ zaslať tovar na odborné
            posúdenie. Ak je tovar zaslaný na odborné posúdenie určenej osobe,
            náklady odborného posúdenia, ako aj všetky ostatné s tým súvisiace
            účelne vynaložené náklady znáša predávajúci bez ohľadu na výsledok
            odborného posúdenia. Ak spotrebiteľ odborným posúdením preukáže
            zodpovednosť predávajúceho za vadu, môže reklamáciu uplatniť znova;
            počas vykonávania odborného posúdenia záručná doba neplynie.
            Predávajúci je povinný spotrebiteľovi uhradiť do 14 dní odo dňa
            znova uplatnenej reklamácie všetky náklady preukázateľne vynaložené
            spotrebiteľom na odborné posúdenie, ako aj všetky s tým súvisiace
            účelne vynaložené náklady. Znova uplatnenú reklamáciu nemožno
            zamietnuť.
          </LI>
          <LI>
            Ak ide o vadu, ktorú možno odstrániť, má spotrebiteľ právo, aby bola
            bezplatne, včas a riadne odstránená. Predávajúci je povinný vadu bez
            zbytočného odkladu odstrániť. Spotrebiteľ môže namiesto odstránenia
            vady požadovať výmenu veci, alebo ak sa vada týka len súčasti veci,
            výmenu súčasti, ak tým predávajúcemu nevzniknú neprimerané náklady
            vzhľadom na cenu tovaru alebo závažnosť vady. Predávajúci môže vždy
            namiesto odstránenia vady vymeniť vadnú vec za bezvadnú vec, ak to
            spotrebiteľovi nespôsobí závažné ťažkosti.
          </LI>
          <LI>
            Ak ide o vadu, ktorú nemožno odstrániť a ktorá bráni tomu, aby sa
            vec mohla riadne užívať ako vec bez vady, má spotrebiteľ právo na
            výmenu veci alebo má právo od zmluvy odstúpiť. Tie isté práva
            prislúchajú spotrebiteľovi, ak ide síce o odstrániteľnú vadu, ale
            spotrebiteľ nemôže pre opätovné vyskytnutie sa vady po oprave alebo
            pre väčší počet vád vec riadne užívať. Ak ide o iné neodstrániteľné
            vady, má spotrebiteľ právo na primeranú zľavu z ceny veci.
          </LI>
          <LI>
            Vybavením reklamácie sa rozumie ukončenie reklamačného konania
            odovzdaním opraveného tovaru, výmenou tovaru, vrátením kúpnej ceny
            tovaru, vyplatením primeranej zľavy z ceny tovaru, písomná výzva na
            prevzatie plnenia alebo jej odôvodnené zamietnutie. Predávajúci je
            povinný o vybavení reklamácie vydať písomný doklad najneskôr do 30
            dní odo dňa uplatnenia reklamácie. V prípade opodstatnenej
            reklamácie, predávajúci uhradí spotrebiteľovi všetky účelne
            vynaložené náklady súvisiace s reklamáciou tovaru.
          </LI>
          <LI>
            Predávajúci týmto informuje spotrebiteľov, že akékoľvek svoje práva
            a nároky si môžu voči predávajúcemu uplatňovať aj v rámci
            alternatívneho riešenia spotrebiteľských sporov (on-line). Rovnako
            aj nároky predávajúceho voči spotrebiteľom môžu byť uplatnené
            prostredníctvom alternatívneho riešenia spotrebiteľských sporov.
            Príslušným subjektom na alternatívne riešenie spotrebiteľských
            sporov s predávajúcim je Slovenská obchodná inšpekcia alebo iná
            príslušná oprávnená právnická osoba zapísaná v zozname subjektov
            alternatívneho riešenia spotrebiteľských sporov vedenom
            Ministerstvom hospodárska Slovenskej republiky; všetky potrebné
            informácie o alternatívnom riešení spotrebiteľských sporov je možné
            získať na web stránke:
            https://www.soi.sk/sk/alternativne-riesenie-spotrebitelskych-sporov.soi.
            Alternatívne riešenie sporov sa týka len sporu medzi spotrebiteľom a
            predávajúcim, ktorého hodnota presahuje 20 eur, vyplývajúceho zo
            spotrebiteľskej zmluvy uzatvorenej na diaľku. Využitie
            alternatívneho riešenia spotrebiteľských sporov šetrí peniaze a čas,
            keďže sťažnosť bude vybavená do 90 dní, cez internet a bez značných
            finančných výdavkov (do 5 EUR s DPH).{' '}
          </LI>
          <LI>
            Pre správne používanie stránky je nevyhnutné byť pripojený do
            internetovej siete, pričom používanie internetu môže byť spoplatnené
            poskytovateľom internetových služieb. Predávajúci nenesie žiadnu
            zodpovednosť za správne fungovanie internetovej siete. Predávajúci
            takisto nenesie zodpovednosť za škody pri používaní stránky, pri
            náhodnom či plánovanom výpadku stránky, nefunkčnosti stránky.
            Predávajúci tiež nenesie zodpovednosť pri zneužití registračných a
            prihlasovacích údajov zákazníka, ako ani pri neoprávnenom použití
            platobných prostriedkov.
          </LI>
          <LI>
            Zákazníci využívajú obsah stránky na vlastné riziko. Predávajúci
            nezodpovedá za priame ani nepriame škody, ktoré by zákazníkovi mohli
            vzniknúť v súvislosti s využívaním informácií získaných na stránke.
          </LI>
          <LI>
            Stránka môže odkazovať na web stránky tretích osôb, ktoré
            predávajúci nekontroluje a nezodpovedá za ich obsah. Predávajúci
            nemá povinnosť preskúmať obsah web stránok tretích osôb. To isté sa
            týka aj akejkoľvek reklamy prezentovanej na stránke.
          </LI>
          <LI>
            Systém stránky môže byť v pravidelných intervaloch odstavený za
            účelom vykonania údržby stránky. Predávajúci zároveň nezaručuje
            nepretržitú a bezchybnú funkčnosť servera, na ktorom prevádzkuje
            stránku a má právo kedykoľvek prerušiť poskytovanie služieb na
            akúkoľvek dobu. Odstavenie servera môže predávajúci uskutočniť bez
            predchádzajúceho varovania a bez uvedenia dôvodu.
          </LI>
          <H2 className="text-left">F. Ochrana osobných údajov</H2>
          <LI>
            Pravidlá a podmienky ochrany osobných údajov zákazníkov tvoria obsah
            osobitného dokumentu, ktorý je zverejnený na stránke{' '}
            <Link href="/pravidla-ochrany-osobnych-udajov">
              <a>tu</a>
            </Link>
            .
          </LI>
          <H2 className="text-left">G. Ostatné práva a povinnosti</H2>
          <LI>
            Zákazník je povinný oboznámiť sa s obsahom týchto VOP pred začatím
            používania stránky.
          </LI>
          <LI>
            Zákazníci nesmú používať žiadne zariadenia alebo softvér, ktorý by
            narúšal riadne fungovanie stránky. Publikovanie, prepisovanie alebo
            ďalšie šírenie akéhokoľvek obsahu stránky bez predchádzajúceho
            písomného súhlasu predávajúceho je zakázané. Všetky materiály
            vrátane obrázkov, softvéru, textu a grafiky a iného obsahu stránky
            sú chránené autorským právom a inými právami duševného vlastníctva.
            Označenia tovarov, služieb a spoločností uvádzané na stránke môžu
            byť ochrannými známkami príslušných vlastníkov.
          </LI>
          <LI>
            Zákazník sa zaväzuje, že nebude akýmkoľvek spôsobom neprimerane
            obťažovať iných zákazníkov a používateľov stránky.
          </LI>
          <LI>
            Ak predávajúcemu vznikne akákoľvek škoda v dôsledku toho, že
            zákazník alebo používateľ pri používaní stránky nedodržal tieto VOP
            alebo všeobecne záväzné právne predpisy, je zákazník alebo
            používateľ povinný nahradiť túto škodu predávajúcemu v plnom
            rozsahu.
          </LI>
          <LI>
            Len spotrebiteľ je oprávnený odstúpiť od zmluvy bez uvedenia dôvodu
            do 14 dní odo dňa prevzatia tovaru spotrebiteľom.
          </LI>
          <LI>
            Pri uplatnení práva spotrebiteľa na odstúpenie od zmluvy podľa
            predchádzajúceho bodu 58., je spotrebiteľ povinný informovať
            predávajúceho o svojom rozhodnutí odstúpiť od zmluvy a to
            jednoznačným písomným vyhlásením zaslaným na adresu predávajúceho,
            alebo na e-mailovú adresu predávajúceho. Na účely odstúpenia od
            zmluvy je spotrebiteľ oprávnený využiť aj vzorový formulár na
            odstúpenie od zmluvy, ktorý bol spotrebiteľovi poskytnutý a ktorý je
            pre spotrebiteľa k dispozícii{' '}
            <Link href="vzorovy-formular-na-odstupenie-od-zmluvy">
              <a>tu</a>
            </Link>
            .
          </LI>
          <LI>
            Lehota na odstúpenie od zmluvy sa považuje za zachovanú, ak
            spotrebiteľ odošle oznámenie o uplatnení práva na odstúpenie od
            zmluvy pred tým, ako uplynie lehota na odstúpenie od zmluvy.
          </LI>
          <LI>
            Po odstúpení od zmluvy budú spotrebiteľovi vrátené všetky platby
            ktoré spotrebiteľ uhradil na základe zmluvy alebo v súvislosti s
            ňou, najmä uhradená kúpna cena za tovar, vrátane prípadných ďalších
            platieb prijatých od spotrebiteľa na základe zmluvy alebo v
            súvislosti s ňou, ako sú náklady na doručenie tovaru spotrebiteľovi.
            To sa však nevzťahuje na dodatočné náklady, ak si spotrebiteľ zvolil
            iný spôsob doručenia tovaru, ako je najlacnejší bežný spôsob
            doručenia, ktorý mu bol ponúknutý. Platby budú spotrebiteľovi
            vrátené bez zbytočného odkladu, najneskôr do 14 dní odo dňa
            doručenia vráteného tovaru späť na adresu: AMICUS RELAX, s.r.o.,
            Popradská 6, 064 01 Stará Ľubovňa, Slovenská republika. Úhrada
            týchto platieb bude uskutočnená rovnakým spôsobom, aký spotrebiteľ
            použil pri svojej platbe, ak si predávajúci a spotrebiteľ výslovne
            neodsúhlasili iný spôsob platby, a to bez účtovania akýchkoľvek
            ďalších poplatkov spotrebiteľovi.
          </LI>
          <LI>
            Všetky priame náklady na vrátenie tovaru predávajúcemu znáša
            spotrebiteľ, a to aj náklady na vrátenie tovaru, ktorý vzhľadom na
            jeho povahu nie je možné vrátiť prostredníctvom pošty. Spotrebiteľ
            zodpovedá len za akékoľvek zníženie hodnoty tovaru v dôsledku
            zaobchádzania s tovarom iným spôsobom než aký je potrebný na
            zistenie povahy, vlastností a funkčnosti tovaru.
          </LI>
          <LI>
            V prípade poskytovania služieb, ak spotrebiteľ požiadal o začatie
            poskytovania služieb počas lehoty na odstúpenie od zmluvy, je
            spotrebiteľ povinný uhradiť cenu za skutočne poskytnuté plnenia do
            dňa, kedy spotrebiteľ oznámil svoje rozhodnutie odstúpiť od zmluvy.
            Predávajúci týmto poučuje spotrebiteľa, že v prípade začatia
            poskytovania služby predávajúcim pred uplynutím lehoty na odstúpenie
            od zmluvy, alebo ak spotrebiteľ o poskytovanie tejto služby pred
            uplynutím lehoty na odstúpenie od zmluvy požiada, spotrebiteľ
            udelením súhlasu so začatím poskytovania služby pred uplynutím
            lehoty na odstúpenie od zmluvy stráca po úplnom poskytnutí služby
            právo na odstúpenie od zmluvy. Predávajúci týmto poučuje
            spotrebiteľa, že v prípade využitia služby pred uplynutím lehoty na
            odstúpenie od zmluvy, spotrebiteľ udelením súhlasu so začatím
            poskytovania takéhoto elektronického obsahu pred uplynutím lehoty na
            odstúpenie od zmluvy stráca právo na odstúpenie od zmluvy.
          </LI>
          <LI>
            Podľa ustanovení zákona č. 102/2014 Z. z. o ochrane spotrebiteľa pri
            predaji tovaru alebo poskytovaní služieb na základe zmluvy uzavretej
            na diaľku alebo zmluvy uzavretej mimo prevádzkových priestorov
            predávajúceho a o zmene a doplnení niektorých zákonov, v platnom
            znení, spotrebiteľ nie je oprávnený odstúpiť od zmluvy ak jej
            predmetom je:
            <ol type="a">
              <LI>
                poskytnutie služby, ak sa jej poskytovanie začalo s výslovným
                súhlasom spotrebiteľa a spotrebiteľ vyhlásil, že bol riadne
                poučený o tom, že vyjadrením tohto súhlasu stráca právo na
                odstúpenie od zmluvy po úplnom poskytnutí služby, a ak došlo k
                úplnému poskytnutiu služby;{' '}
              </LI>
              <LI>
                predaj tovaru alebo poskytnutie služby, ktorých cena závisí od
                pohybu cien na finančnom trhu, ktorý predávajúci nemôže
                ovplyvniť a ku ktorému môže dôjsť počas plynutia lehoty na
                odstúpenie od zmluvy;
              </LI>
              <LI>
                predaj Tovaru zhotoveného podľa osobitných požiadaviek
                spotrebiteľa, tovaru vyrobeného na mieru alebo tovaru určeného
                osobitne pre jedného spotrebiteľa;
              </LI>
              <LI>
                predaj tovaru, ktorý podlieha rýchlemu zníženiu akosti alebo
                skaze;
              </LI>
              <LI>
                predaj tovaru uzavretého v ochrannom obale, ktorý nie je vhodné
                vrátiť z dôvodu ochrany zdravia alebo z hygienických dôvodov a
                ktorého ochranný obal bol po dodaní porušený;
              </LI>
              <LI>
                predaj tovaru, ktorý môže byť vzhľadom na svoju povahu po dodaní
                neoddeliteľne zmiešaný s iným tovarom;
              </LI>
              <LI>
                predaj alkoholických nápojov, ktorých cena bola dohodnutá v čase
                uzavretia zmluvy, pričom ich dodanie je možné uskutočniť najskôr
                po 30 dňoch a ich cena závisí od pohybu cien na trhu, ktoré
                predávajúci nemôže ovplyvniť;
              </LI>
              <LI>
                vykonanie naliehavých opráv alebo údržby, o ktoré spotrebiteľ
                výslovne požiadal predávajúceho; to neplatí pre zmluvy o
                službách a zmluvy, ktorých predmetom je predaj iného tovaru ako
                náhradných dielov potrebných na vykonanie opravy alebo údržby,
                ak boli uzavreté počas návštevy predávajúceho u spotrebiteľa a
                spotrebiteľ si tieto služby alebo tovary vopred neobjednal;
              </LI>
              <LI>
                predaj zvukových záznamov, obrazových záznamov,
                zvukovoobrazových záznamov, kníh alebo počítačového softvéru
                predávaných v ochrannom obale, ak spotrebiteľ tento obal
                rozbalil;
              </LI>
              <LI>
                predaj periodickej tlače s výnimkou predaja na základe dohody o
                predplatnom a predaj kníh nedodávaných v ochrannom obale;
              </LI>
              <LI>
                poskytnutie ubytovacích služieb na iný ako ubytovací účel,
                preprava tovaru, nájom automobilov, poskytnutie stravovacích
                služieb alebo poskytnutie služieb súvisiacich s činnosťami v
                rámci voľného času a podľa ktorej sa predávajúci zaväzuje
                poskytnúť tieto služby v dohodnutom čase alebo v dohodnutej
                lehote;
              </LI>
              <LI>
                poskytovanie elektronického obsahu inak ako na hmotnom nosiči,
                ak sa jeho poskytovanie začalo s výslovným súhlasom spotrebiteľa
                a spotrebiteľ vyhlásil, že bol riadne poučený o tom, že
                vyjadrením tohto súhlasu stráca právo na odstúpenie od zmluvy.{' '}
              </LI>
            </ol>
            V prípade dodania tovarov alebo služieb predávajúceho uvedených
            vyššie, spotrebiteľ nie je oprávnený od zmluvy odstúpiť.
          </LI>
          <LI>
            Predávajúci poučuje spotrebiteľa, že orgánom dozoru v oblasti
            predaja, predaja cez internet a spotrebiteľských práv je Slovenská
            obchodná inšpekcia, Inšpektorát SOI pre Prešovský kraj, Obrancov
            mieru 6, 080 01 Prešov, odbor výkonu dozoru, tel. č.: (+421)
            051/7721597.
          </LI>
          <H2 className="text-left">H. Prechodné a záverečné ustanovenia</H2>
          <LI>
            Tieto VOP platia v znení uvedenom na stránke v deň odoslania
            elektronickej objednávky s výnimkou, ak je medzi predávajúcim a
            zákazníkom vyslovene dohodnuté inak.
          </LI>
          <LI>
            Zákazník súhlasí s tým, že predávajúci je oprávnený kedykoľvek
            aktualizovať alebo inak zmeniť tieto VOP. Ak je (sa stane) akékoľvek
            ustanovenie týchto VOP neplatné, nezákonné alebo nevymáhateľné,
            všetky ostatné ustanovenia a podmienky týchto VOP ostávajú v plnej
            platnosti a účinnosti. Tieto VOP sa spravujú slovenským právnym
            poriadkom. V prípade, ak sú tieto podmienky preložené do inej
            jazykovej verzie, tak v prípade rozporu má prednosť slovenská
            jazyková verzia.
          </LI>
          <LI>
            Zákazník vyhlasuje, že sa pred vyplnením elektronickej objednávky
            oboznámil s týmito VOP a že s nimi súhlasí. Bez ohľadu na ostatné
            ustanovenia zmluvy nezodpovedá predávajúci zákazníkovi za ušlý zisk,
            stratu príležitosti alebo žiadne iné nepriame alebo následné straty
            vzniknuté v dôsledku nedbalosti, porušenia zmluvy alebo vzniknuté
            iným spôsobom.
          </LI>
          <LI>
            Táto verzia všeobecných obchodných podmienok bola vydaná dňa
            31.08.2020.
          </LI>
        </ol>
      </Container>
    </Wrapper>
  </Layout>
);

export default withSetCart(VOP);
