import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from "react-swipeable-views-react-18-fix";
import { autoPlay } from "react-swipeable-views-utils-react-18-fix";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'სსიპ აკადემიკოს ილია ვეკუას სახელობის ფიზიკა-მათემატიკის ქალაქ თბილისის N 42 საჯარო სკოლა',
    imgPath:
      '/images/vekua.jpg',
  },
  {
    label: 'აქ ყველა პირობაა შექმნილი იმისათვის, რომ მოსწავლეებმა გაიღრმავონ მათემატიკისა და ფიზიკის ცოდნა, დაეუფლონ უმაღლესი მათემატიკის ელემენტებს.',
    imgPath:
      '/images/cos.jpg',
  },
  {
    label: 'ჩვენი ქვეყანა გაძლიერდება, როდესაც თითოეულ ახალ ვეკუელს შეეძლება ხელი შეუწყოს ჩვენს კეთილდღეობასა და ინოვაციას მათემატიკისა და მეცნიერების საშუალებებით.',
    imgPath:
      '/images/carousel.jpg',
  },
  {
    label: 'ჩვენ ვხსნით შესაძლებლობების კარს და ვხელმძღვანელობთ ჩვენს მოსწავლეებს, რადგან ისინი წარმოადგენენ ჩვენი საერთო მომავალს.',
    imgPath:
      '/images/last_bell_2022.jpeg',
  },
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  useEffect(() => {
    theme.palette.mode = localStorage.theme;
  }, [theme.palette])

  return (
    <Box sx={{ maxWidth: '100%', flexGrow: 1 }} className='relative dark:bg-slate-900'>
      <div className='hidden md:block absolute bottom-16 z-10 left-0 right-0'>
        <div
          className=' p-2 w-2/3 mx-auto text-center bg-white rounded-md shadow-md font-glaho dark:bg-slate-900'
        >
          <p className='dark:text-[#ffffffdb]'>{images[activeStep].label}</p>
        </div>
      </div>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  display: 'block',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        classes={{
          root: 'dark:!bg-slate-800 transition-all duration-300'
        }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
    </Box>
  );
}

export default SwipeableTextMobileStepper;