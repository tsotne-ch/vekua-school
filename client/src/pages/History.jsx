import Banner from './components/Banner'
import Mission from './components/Mission'
import Story from './components/Story'
import { Timeline } from "flowbite-react";
import { HiCalendar } from "react-icons/hi";

const History = () => {
  return (
    <>
      <Banner heading="ისტორია და მისია" />
      <Mission heading="მისია" />
      <Story heading="მისია" />
      <div className='container py-10'>
        <Timeline horizontal theme={{ item: { point: { marker: { icon: { wrapper: "absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-50 ring-8 ring-gray-200 bg-sky-200 dark:bg-sky-800 dark:ring-gray-900" } } } } }}>
          <Timeline.Item>
            <Timeline.Point icon={HiCalendar} />
            <Timeline.Content>
              <Timeline.Time>1950</Timeline.Time>
              <Timeline.Title>სკოლის დაარსება</Timeline.Title>
              <Timeline.Body>
                ოფიციალურად დაარსდა ილია ვეკუას სახელობის N42 საჯარო სკოლა სოლოლაკის რეგიონში.
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Point icon={HiCalendar} />
            <Timeline.Content>
              <Timeline.Time>1963-1964</Timeline.Time>
              <Timeline.Title>ფიზიკა-მათემატიკა</Timeline.Title>
              <Timeline.Body>
                განათლების სამინისტროს მხარდაჭერით, სკოლამ შემოიტანა თავისი პირველი ფიზიკა-მათემატიკის პროფილის კლასი, სადაც გამოვიდა საპატიო კურსდამთავრებულების პარტია.
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Point icon={HiCalendar} />
            <Timeline.Content>
              <Timeline.Time>1966</Timeline.Time>
              <Timeline.Title>ახალი სახელწოდება</Timeline.Title>
              <Timeline.Body>
                1966 წელს სკოლას ოფიციალურად მიენიჭა დიდი მეცნიერისა და აკადემიკოს ილია ვეკუას სახელი
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Point icon={HiCalendar} />
            <Timeline.Content>
              <Timeline.Time>1982</Timeline.Time>
              <Timeline.Title>გაძლიერებული სწავლება</Timeline.Title>
              <Timeline.Body>
                სკოლა ოფიციალურად გახდა სპეციალიზირებული ფიზიკა-მათემატიკის მხრივ და მიღება დაიწყეს მეშვიდე კლასსში სარეკომენდაციო წერის შედეგების მიხედვით
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      </div>
    </>
  )
}

export default History