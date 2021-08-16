import { nanoid } from "@reduxjs/toolkit";
export const questions = [
  {
    id: nanoid(),
    title: "Question 1",
    text: "What is the perimeter of a circle called?",
    answers: ["circumference"],
  },
  {
    id: nanoid(),
    title: "Question 2",
    text: "What is the square root of 144?",
    answers: ["12"],
  },
  {
    id: nanoid(),
    title: "Question 3",
    text: "Can pi be written as a fraction",
    answers: ["yes"],
  },
  {
    id: nanoid(),
    title: "Question 4",
    text: "What is 64 divided by 8",
    answers: ["8"],
  },
];
