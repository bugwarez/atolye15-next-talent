# İlan ve Freelancer Profili Match Algoritması
Atolye15 Next Talent Projesi freelancer ve iş ilanlarını skorlayıp eşleştiren algoritmada yaptıklarım, final skorunu hesaplama şeklim ve bu skor hesaplanırken dikkate alınanlar.

## Öncelikle, ilanda aranan kriterleri belirledim:
İlan kriterleri ile freelancer profilinden eşleştirilebilecek alanlar, `Specialization`(Uzmanlık Alanı) , `Seniority`(Uzmanlık) , `Technology`(Teknolojiler) , `Employment Type`(Çalışma Şekli) ve `Experience Duration and Project Length`(Uzmanlık Süresinin proje uzunluğuna oranı)
### 1-Uzmanlık Alanı(Front-End Developer, Full-Stack Developer vs.)
(**%30 Öncelik(puan hesaplamalarında 0.30* olarak hesaplanacak)**)
    -Freelancer'ın öncelikli yeteneklerini belirlemek ve ilanda istenen uzmanlık alanı ile eşleştirmek.

 ### 2-Uzmanlık(Lead, Senior, Mid, Junior)
(**%15 Öncelik(puan hesaplamalarında 0.15* olarak hesaplanacak)**)
    -Freelancer'ın uzmanlığını belirlemek, ilanda istenen uzmanlığa göre eşleştirmek.

    
 ### 3-Teknolojiler(React, NodeJS, ExpressJS, Prisma ORM, Typescript vs.)
(**%30 Öncelik(puan hesaplamalarında 0.30* olarak hesaplanacak)**)
    -Freelancer'ın uzman olduğu teknolojilerin belirlenmesi, ilanda belirtilen "Tech Stack"'e uyması.
    
  -Teknolojiler için daha yüksek bir öncelik beklenebilirdi ancak tek bir teknolojinin birden fazla alanda kullanımı olabildiği için(Örn: Python: AI, Web, Game Dev vs.), Python'u web geliştiricisi olarak bilen birisinin AI ilanları ile karşılaşmasını istemiyoruz.

   ### 4-Çalışma Şekli(Full Time, Part Time, Emin Değil)
(**%10 Öncelik(puan hesaplamalarında 0.10* olarak hesaplanacak)**)
    -Freelancer'ın çalışmak istediği şekli/sıklığı belirlemek, İlanı paylaşan şirketin istediği çalışma şekline uyması.

  -%10 gibi bir öncelik olmasının sebebi, bilinen teknolojiler, uzmanlık ve uzmanlık alanlarının aksine, fikrinin değişebileceği bir özellik olduğundan, full time bir proje arasa ama part time bir ilan ile yüksek bir skorla eşleşse bile, bu ilana başvurabileceğinden.

   ### 5-Uzmanlık Tecrübesi/Süresi (INT değer, Uzmanlığın başladığı ay/yıl'dan günümüze kadar olan "Ay" süresi)
(**%15 Öncelik(puan hesaplamalarında 0.15* olarak hesaplanacak)**)
    -Freelancer'ın uzmanlık alanındaki tecrübesini belirlemek, ilanda aranan adayın ne kadar zamandır bu tür projelerde çalıştığını anlamak için.


  # Her özelliğe göre kriter skorlarının hesaplanması:

| Alan  | Hesaplanması |
| ------------- | ------------- |
|**Uzmanlık Alanı**| Tam Uyum(Hem İlan, Hem Aday Profilinde Front-end Developer) 1 Puan, <br/>  Kısmi Uyum(Fullstack olan bir aday, sadece Front-end veya Back-End ilanlarına uygun olabilir) 0.5 puan.  |
| **Uzmanlık**  | Tam Uyum(Hem ilan, hem de aday profili **Junior**) 1 Puan, <br/> Kısmi Uyum(İlan profili **Mid**, Aday Profili **Senior**, olduğu durumda) 0.7 Puan, <br/>  Düşük Uyum(İlan Profili **Senior**, Aday profili **Junior** olduğunda)  |
| **Teknoloji**  | Çoklu seçeneklerin eşleşebileceği bir veri seti olduğundan, şemadaki her bir `JobTechnology` için: <br/> Aynı Teknoloji ve Teknolojideki Uzmanlık için Tam Uyum(örn: Hem ilanda, hem freelancer profilinde React(Senior)) 1 Puan(Uyuşan her bir teknoloji için). <br/> Kısmi Uyum(İlandaki Teknoloji(React) **Senior** isteyip, aday profilindeki Teknoloji(React) **Mid** olduğunda 0.5 Puan(Uyuşan her bir teknoloji için)). Önemli Not: Kısmi uyum durumlarında, uyuşan teknoloji başında 0.5 puan ekle ve iş ilanındaki teknoloji sayısına göre normalize et.|
| **Çalışma Şekli**  | Tam Uyum(Hem ilan, hem de aday profili **Full Time** veya Aday Profili **Emin Değilim** olduğunda) 1 Puan, <br/> Kısmi Uyum(İlan profili **Full Time**, Aday Profili **Part Time**, olduğu durumda) 0.5 Puan|
| **Uzmanlık Süresi**  | Tam Uyum(İlandaki proje süresi, Adayın toplam tecrübesine eşit veya daha azsa) 1 Puan, <br/> Kısmi Uyum(İlandaki proje süresi, aday'ın toplam tecrübesine yakınsa(6 ay kadar)) 0.5 Puan|

# Toplam Match Skorunun Hesaplanması
```
Match Skoru = (0.3 * Uzmanlık Alanı Skoru) + (0.2 * Uzmanlık Skoru) + (0.25 * Teknoloji Skoru) + (0.1 * Çalışma Şekli Skoru) + (0.15 * Uzmanlık Süresi Skoru)
```

# Bir Örnek:
`JobPost`:

Uzmanlık Alanı: Front-End Developer

Uzmanlık: Mid

Teknolojiler: React, TypeScript, Redux

Çalışma Türü: Full Time

Proje Süresi: 12 Ay


`Profile`:

Uzmanlık Alanı: Front-End Developer

Uzmanlık: Mid

Teknolojiler: React, TypeScript, GraphQL

Çalışma Türü: Full Time

Deneyim Süresi: 24 Ay

### Bu verilere göre:

**Uzmanlık Alanı Uyumu**: Tam uyumlu olduğu için 1 puan,

**Uzmanlık Uyumu**: Tam uyumlu olduğu için 1 puan,

**Teknoloji Uyumu**: İlanda React, TypeScript ve Redux istiyor ancak aday'ın teknolojileri React, Typescript ve **GraphQL**. Bu duruma göre React ve Typescript için 1er puan, Redux eksik olduğu için 0 puan. Normalize etmek için: 2/3 = 0.67 Puan alıyor Teknolojilerden.

**Çalışma Türü**: İlan ve Aday, Full Time istiyor, 1 puan,

**Deneyim Süresi Uyumu**: İlan Süresi 12 Ay, Aday toplam tecrübesi 24 ay, dolayısıyla 1 puan(Aday tecrübesi ilan süresinden fazla olsa dahi ekstra puan verilmiyor. maksimum 1 puan.)

### Denklemi tekrar kurarsak:
```
0.9175 = (0.3 * 1) + (0.2 * 1) + (0.25 * 0.67) + (0.1 * 1) + (0.15 * 1)
```
0.9175 * 100 (Sonucu %lik olarak göstermek için)

