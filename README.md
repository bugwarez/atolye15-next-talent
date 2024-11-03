# Atolye15 Next Talent

![Next Talent](https://cdn.prod.website-files.com/63b890112a7432d20d9f1af0/63cfd033c43ad33a3e01165d_atolye15-logo.svg)

Atolye15 Next Talent freelancer-company matching platform Database architecture &amp;&amp; GraphQL Schema &amp;&amp; Notes

![Next Talent](https://cdn.prod.website-files.com/63b890112a7432d20d9f1af0/67038b9fc97cb1a9bbc2811d_next-talent-logo.svg)

Selamlar, Ben Tunahan GÜNDÜZ, Bu repo da Atolye15 Next Talent Projesi için hazırladığım "GraphQL schema" ve "Database architecture"

[Algoritmanın Testi için](https://www.typescriptlang.org/play/#code/PQKgBAggNg5g9gJwJYBcC2BDAdoRkAthQFMBnFJMJAc6XwDeEtCBrMJuAEzBGACgUBPAA6EwAKTgAjAApxSYALxgA3jzBhCAD2EIyxQgC4wpZFhgBuVUcJYkiVP0PGa5ywkIBHAK5I37ACqEAMYAFlhwUHAwSCSOKCYwANoAuhZqAO6ITH5CBkZxzqlggghwAFZBKAAinggYZHBYALINKMHEhlieaBKECBYAvhZ8OWAAYm6EUNiBvVIlAGZIUCKKKmqa2rq5TqaFejZ2ArHxhUQhYRFRMXnxyYXFhPO9vgDqmdnCxwWWG73RWDNmlhWu0wJ1ur0BkN5p4AfV8IEMFBAp4pkRGnUQgBlQKIQgAClKkhkpEM4mkshQABowPMJlMAb1DONCJNprMFktCABKDpdHoIZSqZYoIy4twKMAABiGamAwDAAFUAF6YLBQHAsaDYHBgfFSqkAZjAADXGVAkExuZYReotL0tji8ZKZZYkPM9USKaQAHS-HRIPQKeSKOmshkzBB++0BvTcoVqdYxx3ilZgACMZjA8rAfgwaCV-C6ln66igQfdesJxMp0c2gZWIbAACJxi1rJxKoQAG6TOCCNDWFDNsAAH1HYC9JJQdYdDeDimbACEMIEmB2wF3exEB0Pm-HLImj0eAGQn2n09lR-1bBct0ao8soVcsLd93fA-cJxM3htOiWKFKPoAKxZjmADSODEGg5CKkWaDMo+pAvmAGDsBg-BjCUwIdsAK5rhuSw6lgGBgBIGCAPqA3Y1J4-CICWljEKmYAANSKL+ej-iI4BAYasrZgqKpqhqLD6lSABMprmpa1pqLiWByPstjIAIXGSlOtZKYcmEhqGl6MlGWkqZhAD8GZgIYrpqExzpsVYBzGWpPE+uJ-E5gETAXGUXKCmJ4nAVJMwWlaljyXImAoCEzgBOc4SRNExDqTWvpuF4PiEP4QShHFVzED6ixQEQCD4mcwQKAAfBe4ZXj6pVeblPo0IEUCeOwJAlVl3Lcj6yymK0hRhaKdU5fwamKBFUWmDF2WXAl2aTslM6pd4vjTfVCU9dYMD9YxzF2cNlyjcxzn+W5CoAONIjgFGYLmAA-CB3XqBrpoFkwyaFDRyBkCBZDkY0Ld6M4-X9wh3mGbIGT6DxPAgrzvCMZmvZZex7YoIMfIQTnSj6mY8JYOZdow-BIAWWIPSQ5BiemAVmkFH1yV9or+v8MwAxDEa9LOyDWICLRtGA5WKBpvrFGUFTVLU8JAiCYBIxZ0qo7Z7ExqzWPHTjNP8W4KA1PgNluAM+M5iaDDMBQFEUAyuroc+xA4Dwg2A9OZKLZKax2vWeiGK2SHPmum49u+g6flSjHWMp9g+40ACSlTNmHajLelmWxbN1wJM2ABKhCrsONLNpjOLIII+ctjn7CeBozZJInYAYzkPujIqAAyLcAPp+DHjQAKIJ5YYvlIEVQ1HUthNPzoLpuJYeDMbwCm4wLBoRhRSclAYC2xg9uO0zVWQ5GzL6ZGcxwAVaYexxuStthRBYJ2Qc7iH+fhw5UctrH8d1wd8UZ9nufDwTi2IugQS5l2bAAcVqIIYIABFFuNc64w2eBlN4v1MZN1bh3Luvd+5Jm0GrGWbRDDiQACyzyGE7CawQAaImRKiOohAMSRRoamasQMaQcyvNyCwYVwiEB6pEfEzYe4UWWDdEQUhPA6n0EA6hXFapwFGEgDQGV8SkK6hYIAA)

[Şema](schema.graphql)

[DB Yapısı](11-2-2024-init.sql)
# GraphQL Schema Notları:

1-İlan açan ve ilanlara başvuran iki tarafı da user olarak tanımlayıp, bu userları sahip oldukları rollere göre ayırarak her kişinin hem "şirket yetkilisi", hem de gerektiğinde "freelancer" olabileceği zamanlarda farklı hesaplar açmaması için, tek user altında farklı `User Role` ile topluyoruz.

2-Asıl profil detaylarını farklı bir Profile type'ında saklıyoruz. böylece user ve user profile yapıları birbirinden ayrı kalıp daha modüler bir yapı olmasına izin veriyor.

3-Freelancer profillerindeki teknolojiler, `ProfileTechnology` type'ı ile saklanıyor. böylece tecrübeler ve user profil detaylarını birbirinden ayırarak daha modüler bir yapı oluşuyor.

4-Uzmanlık Alanlarını(Front-end developer, back-end developer vs.) figma dizaynında görüldüğü üzere statik 7 element olduğu ve bu elementler de `RadioButton` html elementi ile listelendiği için; özelleştirme, ekleme olmayan, sabit bir `Specialization`  enum olarak 
saklanıyor.

5-Hem freelancer profilindeki Uzmanlık alanlarının tecrübelerini tanımlaması için, hem de ilandaki uzmanlıkların(Front-end developer, back-end developer vs.) derecelendirmesi/notlandırılması için aynı `Seniority` enum'u kullanılıyor.

6-Freelancerların profillerinde sergilenen iş tecrübelerinin tanımlandığı bölüm, şema üzerinde `Experience` olarak.


### Neden Böyle Yaptım?
Tüm architecture kısmında hangi alanlarda neden bu kararları aldığımı açıkladığım kısım:
| Alan Yapısı  | Neden Böyle Yapıldı? |
| ------------- | ------------- |
| Freelancer ve Company profilleri neden tek user?  | aynı fieldlara sahip olabilecek freelancer ve şirket temsilcisi için farklı tablolara ihtiyaç olmadan, tek tabloda `UserRole` field'ı ile sorunu çözebilmek ve kişinin hem "şirket yetkilisi", hem de gerektiğinde "freelancer" olabileceği zamanlarda farklı hesaplar açmaması için.  |
| User ve Profil detayları neden ayrı?  | User Authentication kısmını daha kompleks olmadan çözebilmek, güvenliği daha önemli olan `User` detaylarının farklı kurallar altında saklanması, Geliştirebilirlik açısından profile yeni bir field ekleneceğinde Auth operasyonlarının yürütüldüğü `User` tablosu şişirilmeden ve hafif bir şekilde yönetilebilir ve Auth operasyonları daha performanslı çalışır. |
| Uzmanlık Alanları(`Specialization`) neden Enum?  | Tasarımda sabit 7 alan olduğundan ve client(kullanıcı) tarafında bu alanların düzenlenebilir olmamasından dolayı. |
| İş Tecrübesi(`Experience`) ve Profil detayları neden ayrı?  | Sadece iş tecrübelerinin fetch/post/put/delete aksiyonlarında gereksiz requestlerden kaçınmak, ayrıca eğer `Experience` alanına eklenecek yeni bir field olduğunda(örn: Sertifikalar), `Profile` tablosuna dokunmadan ve güvenli bir şekilde düzenlemek. İş tecrübesinin daha detaylı saklanması(işe giriş-çıkış tarihi, şirket adı, çalıştığı alan gibi fieldları ayrı tutup DX açısından daha uygun olması) |
| `JobPost` type'ındaki haftalık çalışma saati(`hoursPerWeek`) neden Int?  | Şimdiki zamanda sabit 3 adet saat değeri(40-25-0(emin değil)) olabilir ancak ilerleyen zamanlarda customize edilebilecek bir alana dönüşebilir. bu sebeple freelancer'ın haftada çalışmak istediği zaman listelenmemişse, kendisi custom olarak bir int değer girerek "x saat çalışırım" diyebilir. |
| `JobPost` type'ındaki Proje süresi(`projectLength`) neden int?  | tarihlerin her zaman database/client kısımlarındaki tutarsızlık problemlerinin önüne geçmek, yıl/ay ayrımını farklı bir field(duration:3, durationType:"month") gibi yapmamak için, kontrat süresini sadece ay olarak saklayıp, ui kısmında parse ederek istersek 12 month = 1 Year gibi yazdırabiliriz. |
| `JobPost` type'ındaki positions(`JobPosition`) neden ayrı?  | Aslında diğer modüler yapılarda olduğu gibi, geliştirebilirlik, DX, Optimizasyon sebepleri yüzünden. |


# Asıl eşleştirme algoritması dökümanı, [match_algorithm.md](match_algorithm.md) içerisinde, test kodu ise [main.ts](main.ts) içerisinde
