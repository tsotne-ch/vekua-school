import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import glaho from "../noto.ttf";

Font.register({
  family: "glaho",
  src: glaho,
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#E4E4E4",
    padding: 25,
    height: "100vh",
  },
  section: {
    margin: 4,
    fontFamily: "glaho",
  },
  image: {
    width: 60,
  },
});

const Card = ({ student, image }) => {
  return (
    <Document style={{ height: "100%", backgroundColor: "white" }}>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Image src={"/vekua_simplified.png"} style={styles.image} />
        </View>
        <View style={styles.section}>
          <View
            style={{
              height: 4,
              width: "100%",
              backgroundColor: "#0284c7",
              marginVertical: 15,
            }}
          />
          <Text style={{ fontFamily: "glaho", fontSize: 13 }}>
            სსიპ აკადემიკოს ილია ვეკუას სახელობის ფიზიკა-მათემატიკის ქალაქ
            თბილისის N 42 საჯარო სკოლა
          </Text>
          <Text
            style={{
              fontFamily: "glaho",
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            მოსწავლის რეგისტრაციის ბარათი
          </Text>
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <View>
              <Image source={image} style={{ height: 135, marginTop: 15 }} />
            </View>
            <View style={{ flexGrow: 1 }}>
              <Text
                style={{ fontFamily: "glaho", fontSize: 13, marginTop: 20 }}
              >
                რეგისტრაციის კოდი
              </Text>
              <Text style={{ fontFamily: "glaho", fontSize: 24 }}>
                {student.code}
              </Text>
              <Text
                style={{ fontFamily: "glaho", fontSize: 12, marginTop: 10 }}
              >
                მოსწავლის სახელი და გვარი
              </Text>
              <Text style={{ fontFamily: "glaho", fontSize: 14 }}>
                {student.name} {student.surname}
              </Text>
              <Text
                style={{ fontFamily: "glaho", fontSize: 12, marginTop: 10 }}
              >
                მოსწავლის პირადი ნომერი
              </Text>
              <Text style={{ fontFamily: "glaho", fontSize: 14 }}>
                {student.id}
              </Text>
            </View>
          </View>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 18,
              marginTop: 20,
            }}
          >
            პროცედურული მოთხოვნები და პირობები:
          </Text>

          <Text
            style={{ fontSize: 13, fontWeight: "bold", marginVertical: 10 }}
          >
            სარეკომენდაციო წერაზე გამომსვლელი ვალდებულია:
          </Text>

          <Text style={{ fontSize: 9 }}>
            • სარეკომენდაციო წერაზე, სარეგისტრაციო ბარათით, 30 წუთით ადრე
            გამოცხადდეს;
          </Text>
          <Text style={{ fontSize: 9 }}>
            • ჰქონდეს საწერი კალამი, სახაზავი, ფანქარი, საშლელი
          </Text>

          <Text
            style={{ fontSize: 13, fontWeight: "bold", marginVertical: 10 }}
          >
            სარეკომენდაციო წერაზე გამომსვლელს უფლება აქვს:
          </Text>

          <Text style={{ fontSize: 9 }}>
            • ტექნიკურ საკითხებთან დაკავშირებით კონსულტაციისა და
            განმარტებისათვის მიმართოს მეთვალყურეს;
          </Text>
          <Text style={{ fontSize: 9 }}>
            • ჰქონდეს წყალი პოლიეთილენის ბოთლით;
          </Text>

          <Text
            style={{ fontSize: 13, fontWeight: "bold", marginVertical: 10 }}
          >
            სარეკომენდაციო წერაზე გამომსვლელს ეკრძალება:
          </Text>

          <Text style={{ fontSize: 9 }}>• თან ჰქონდეს მობილური ტელეფონი;</Text>
          <Text style={{ fontSize: 9 }}>
            • გამოიყენოს ნებისმიერი საინფორმაციო წყარო;
          </Text>
          <Text style={{ fontSize: 9 }}>
            • წერის მსვლელობის დროს ვერბალური და არავერბალური კომუნიკაცია სხვა
            მონაწილესთან
          </Text>
          <Text style={{ fontSize: 9, fontWeight: "bold" }}>
            • VII – VIII კლასში გადამსვლელებს მათემატიკის წერაზე კალკულატორის
            გამოყენება
          </Text>

          <Text
            style={{ fontSize: 13, fontWeight: "bold", marginVertical: 10 }}
          >
            ნამუშევრის შეფასება და აპელაცია:
          </Text>

          <Text style={{ fontSize: 9 }}>
            ნამუშევრები გამსწორებლამდე მიდის კოდირებული ფორმით; შეფასებები
            გამოქვეყნდება სკოლის საიტზე სარეკომენდაციო წერიდან 10 დღის
            განმავლობაში სარეგისტრაციო ბარათის ნომრის შესაბამისად; სააპელაციო
            განაცხადის ფორმების შევსება მოხდება სკოლაში შედეგების
            გამოქვეყნებიდან ორი სამუშაო დღის განმავლობაში, მისამართზე პეტრე
            ჩაიკოვსკის N9; აპელაციას გაივლის მხოლოდ კოდირებული ნაშრომი
            მოსწავლისა და მშობლის გარეშე; აპელაციის შედეგები გამოქვეყნდება
            სკოლის ვებგვერდზე vekua42.edu.ge აპელაციის დასრულებისთანავე.
          </Text>

          <View>
            <View
              style={{
                height: 4,
                width: "100%",
                backgroundColor: "#0284c7",
                marginVertical: 15,
              }}
            />
            <Text
              style={{
                fontFamily: "glaho",
                fontSize: 13,
              }}
            >
              მის: თბილისი, ჩაიკოვსკის 9
            </Text>
            <Text style={{ fontFamily: "glaho", fontSize: 13, marginTop: 2 }}>
              ელ-ფოსტა: tbilisi42@mes.gov.ge
            </Text>
            <Text style={{ fontFamily: "glaho", fontSize: 13, marginTop: 2 }}>
              ტელ: (995) 032 2 99 00 73
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Card;
