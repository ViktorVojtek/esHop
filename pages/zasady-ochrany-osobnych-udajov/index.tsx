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

const PrivacyPolicy: () => JSX.Element = () => (
  <Layout>
    <Wrapper>
      <Container>
        <H1>Pravidlá spracúvania osobných údajov</H1>
        <P>
          Zachovanie najvyššej miery ochrany vášho súkromia je pre nás
          prioritou, preto sa snažíme o zabezpečenie vysokej úrovne ochrany
          vašich osobných údajov pri ich spracúvaní v súlade s Nariadením
          Európskeho parlamentu a Rady (EÚ) 2016/679 z 27. apríla 2016, o
          ochrane osobných údajov ktorým sa zrušuje smernica 95/45/ES (všeobecné
          nariadenie o ochrane údajov) (ďalej len „GDPR“).
        </P>
        <P>
          Pre účely GDPR je prevádzkovateľom, ktorý určuje rozsah a účel
          spracúvania osobných údajov poskytnutých prostredníctvom niektorej z
          funkcionalít tejto webstránky, spoločnosť PIENINY RESORT s.r.o., so
          sídlom Popradská 6, 064 01 Stará Ľubovňa, IČO: 36 821 063,
          registrovaná v Obchodnom registri vedenom Okresným súdom Prešov, odd.
          Sro, vložka č. 18993/P (ďalej aj ako „prevádzkovateľ“).
        </P>
        <P>
          Ak máte akékoľvek otázky týkajúce sa spracúvania osobných údajov,
          ktoré sme od Vás získali, alebo ak chcete uplatniť niektoré z nižšie
          uvedených práv, prosím kontaktujte nás prostredníctvom písomných
          podaní adresovaných na vyššie uvedenú adresu sídla prevádzkovateľa
          alebo elektronicky na e-mailovej adrese{' '}
          <a href="mailto: office@kupelecks.sk">office@kupelecks.sk</a>
        </P>
        <H2>Získavanie osobných údajov</H2>
        <P>
          Tieto pravidlá sa používajú pri spracúvaní osobných údajov,
          získavaných prevádzkovateľom prostredníctvom vyplnenia kontaktného
          formulára umiestneného na tejto webstránke, žiadosti o zasielanie
          noviniek (newsletter) a osobných údajov poskytnutých prostredníctvom
          telefonickej alebo emailovej komunikácie uskutočnenej na základe
          kontaktných informácií uvedených na tejto webstránke.{' '}
        </P>
        <H2>Rozsah spracúvaných osobných údajov</H2>
        <P>
          Pre účely špecifikované v nadchádzajúcom odseku týchto pravidiel je
          nevyhnutné spracúvať osobné údaje o jednotlivcoch, ktorí majú záujem o
          rezerváciu a/alebo využitie kúpeľných, ubytovacích, stravovacích a
          súvisiacich služieb z nášho portfólia, a o jednotlivcoch, ktorí majú
          záujem byť informovaní o aktuálnej ponuke služieb a produktov z nášho
          portfólia, a o jednotlivcoch, ktorých máme záujem osloviť v záujme
          realizácie našich marketingových aktivít. Získané osobné údaje však
          spracúvame v súlade so zásadou minimalizácie spracúvania osobných
          údajov podľa článku 5 GDPR a preto ich spracúvame len v nevyhnutnej
          miere a nasledujúcom rozsahu: meno a priezvisko, e-mailová adresa a
          telefónne číslo. Predmetom nami vykonávaného spracúvania osobných
          údajov, nie sú osobitné kategórie osobných údajov, ani osobné údaje
          osôb mladších ako 16 rokov. Je veľmi dôležité aby osobné údaje, ktoré
          o vás spracúvame boli pravdivé a aktuálne. Informujete nás prosím, ak
          sa vaše osobné údaje počas trvania spracúvania zmenia.
        </P>
        <H2>Účel spracúvania osobných údajov</H2>
        <P>Vaše osobné údaje spracúvame na nasledujúce účely:</P>
        <ol type="a">
          <LI>
            na komunikáciu s vami, poskytnutie reakcie alebo spätnej väzby k
            prejavenému záujmu alebo podnetu z vašej strany predloženému
            prostredníctvom niektorej z funkcionalít tejto webstránky alebo
            využitia kontaktných údajov umiestnených na tejto webstránke;
          </LI>
          <LI>
            na marketingové účely a realizáciu našich marketingových aktivít,
            ktoré sú v súlade so zákonom a zahŕňajú poskytovanie informácií o
            portfóliu nami ponúkaných služieb a produktov a zasielanie noviniek
            (newsletterov);
          </LI>
          <LI>na účely správy a ochrany tejto webstránky.</LI>
        </ol>
        <P>
          V prípade, ak spracúvame Vaše osobné údaje za účelom priameho
          marketingu vo forme zasielania newsletterov o novinkách a ponuke
          našich služieb a produktov, o ktorých si myslíme, že by Vás mohli
          zaujímať, máte možnosť odhlásiť sa z odberu newsletteru, ak už
          nebudete mať v budúcnosti záujem na jeho odbere.
        </P>
        <H2>Právny základ spracúvania osobných údajov</H2>
        <P>
          Spracúvanie vašich osobných údajov na účely popísané v predchádzajúcom
          odseku v písm. a) (t.j. komunikácia na základe vami prejaveného
          záujmu) a v písm. b) (t.j. marketing) vychádza z nášho oprávneného
          záujmu na aktívnej komunikácii s osobami, ktoré prejavia záujem o
          ponúkané služby a produkty a oprávneného záujmu na efektívnej
          marketingovej podpore a propagácii našich podnikateľských aktivít a
          ponuky služieb a produktov. Aj keď sú právnym základom spracúvania
          vašich osobných údajov naše oprávnené záujmy, vždy rešpektujeme a
          uprednostňujeme vaše práva a záujmy pred našimi záujmami.{' '}
        </P>
        <P>
          V prípade spracúvania osobných údajov na účel správy a ochrany tejto
          webstránky je tiež právnym základom spracúvania osobných údajov
          oprávnený záujem, ktorým je zabezpečenie poskytovania IT služieb a
          udržanie bezpečnosti prevádzky tejto webstránky.{' '}
        </P>
        <P>
          Spracúvanie vašich osobných údajov na základe nášho oprávneného záujmu
          vyplýva z článku 6 odsek 1 GDPR. Máte však právo kedykoľvek namietať
          uvedené spracovanie vašich osobných údajov. Za týmto účelom nás
          kedykoľvek kontaktuje písomne na adrese nášho sídla uvedeného v úvode
          týchto pravidiel alebo na e-mailovej adrese{' '}
          <a href="mailto: office@kupelecks.sk">office@kupelecks.sk</a>. Každú
          podanú námietku dôsledne vyhodnotíme a o výsledku Vás budeme
          informovať.
        </P>
        <H2>Doba spracúvania osobných údajov</H2>
        <P>
          Osobné údaje sú uchovávané tak dlho, ako je to potrebné na splnenie
          účelov, na ktoré sme ich získali. Doba spracúvania osobných údajov je
          3 roky odo dňa ich získania. Doba spracúvania osobných údajov je
          pravidelne kontrolovaná a v prípade ak uplynie, je spracúvanie
          osobných údajov ukončené a osobné údaje sú vymazané alebo inak
          zlikvidované.
        </P>
        <H2>Príjemcovia osobných údajov</H2>
        <P>
          Spracúvanie osobných údajov podľa týchto pravidiel sa realizuje aj
          prostredníctvom tretích osôb - sprostredkovateľov. Takouto treťou
          osobou je spoločnosť D.J.K., spoločnosť s ručením obmedzeným, so
          sídlom Južná trieda 26, 040 01 Košice, IČO: 31 691 897, registrovaná v
          Obchodnom registri vedenom Okresným súdom Košice, odd. Sro, vložka č.
          4805/V, e-mailová adresa{' '}
          <a href="danakorcakova@dunajec.sk">danakorcakova@dunajec.sk</a>, ktorá
          pre nás zabezpečuje poskytovanie niektorých ubytovacích a stravovacích
          služieb a vyhľadáva a sprostredkúva pre nás príležitosti na uzavretie
          zmlúv o poskytovaní nami ponúkaných služieb a produktov a iných
          súvisiacich zmlúv. Takýmito tretími osobami sú ďalej poskytovatelia
          služieb, ktoré využívame, aby sme mohli realizovať spracúvanie vašich
          osobných údajov na účely podľa týchto pravidiel. Ide konkrétne o
          služby spojené s technickou a softwarovou podporou a administráciou
          marketingových a predajných aktivít prevádzkovateľa. Prevádzkovateľ
          uzatvoril so sprostredkovateľmi zmluvy o spracúvaní osobných údajov.
          Sprostredkovatelia sú zaviazaní spracúvať osobné údaje výlučne na
          účely špecifikované v týchto pravidlách. Vaše dáta nie sú sprístupnené
          tretím stranám na účely ich nezávislého využitia alebo spracovania nad
          rámec účelov podľa týchto pravidiel.
        </P>
        <H2>
          Prenos osobných údajov do tretích krajín alebo medzinárodnej
          organizácii
        </H2>
        <P>
          Vaše osobné údaje nie sú prenášané do iných štátov mimo Európskej
          únie.{' '}
        </P>
        <H2>Práva súvisiace so spracúvaním osobných údajov</H2>
        <P>
          Podľa GDPR má každá osoba, ktorej osobné údaje sú spracúvané
          prevádzkovateľom, nasledovné práva:
        </P>
        <ol type="a">
          <LI>právo na informácie o spracúvaní jej osobných údajov;</LI>
          <LI>
            rávo získať prístup k osobným údajom, ktoré sa o nej spracúvajú a
            uchovávajú;
          </LI>
          <LI>
            právo požiadať o opravu svojich nesprávnych, nepresných alebo
            neúplných osobných údajov;
          </LI>
          <LI>
            právo požiadať o vymazanie svojich osobných údajov, keď už nie sú
            potrebné, alebo ak je spracúvanie nezákonné;
          </LI>
          <LI>
            právo namietať proti spracovaniu svojich osobných údajov na
            marketingové účely alebo na základe, ktorý súvisí s konkrétnou
            situáciou;
          </LI>
          <LI>
            právo požiadať o obmedzenie spracúvania svojich osobných údajov v
            osobitných prípadoch;
          </LI>
          <LI>
            právo dostať svoje osobné údaje v strojovo čitateľnom formáte
            a/alebo požiadať o ich prenos inému prevádzkovateľovi;
          </LI>
          <LI>
            právo kedykoľvek odvolať svoj súhlas so spracúvaním osobných údajov,
            aby to malo vplyv na zákonnosť spracúvania založeného na súhlase
            udelenom pred jeho odvolaním, ak takýto súhlas osoba udelila.{' '}
          </LI>
          <LI>
            právo požiadať, aby rozhodnutia založené na automatizovanom
            spracúvaní, ktoré sa jej týkajú alebo ju výrazne ovplyvňujú,
            vychádzajúce z jej osobných údajov, vykonávali fyzické osoby a nie
            automatizovane technické prostriedky, ak sú osobné údaje takto
            prevádzkovateľom spracúvané;
          </LI>
          <LI>
            právo podať sťažnosť dozornému orgánu, najmä v členskom štáte svojho
            obvyklého pobytu, mieste výkonu práce alebo v mieste údajného
            porušenia a právo na účinný súdny prostriedok nápravy, ak sa
            domnieva, že je spracúvanie jej osobných údajov v rozpore právnymi
            predpismi. Dozorným orgánom na území Slovenskej republiky je Úrad na
            ochranu osobných údajov Slovenskej republiky, Hraničná 12,
            Bratislava;
          </LI>
          <LI>
            právo podať žiadosť alebo sťažnosť prevádzkovateľovi v súvislosti s
            ochranou a spracúvaním jej osobných údajov. Každá osoba, ktorá chce
            podať žiadosť alebo sťažnosť a uplatniť svoje si práva, môže tak
            vykonať písomne na adrese PIENINY RESORT s.r.o., Popradská 6, 064 01
            Stará Ľubovňa, alebo elektronicky na adrese{' '}
            <a href="mailto: office@kupelecks.sk">office@kupelecks.sk</a>.
          </LI>
        </ol>
        <P className="mt-4">
          Tieto pravidlá spracúvania osobných údajov môžu byť priebežne
          aktualizované a zmenené.
        </P>
        <P>
          Táto verzia pravidiel spracúvania osobných údajov bola vydaná dňa
          02.08.2020
        </P>
      </Container>
    </Wrapper>
  </Layout>
);

export default withSetCart(PrivacyPolicy);
