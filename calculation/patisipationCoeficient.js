'use strict';

// ===================== Розрахунок Коефіцієнту обліку опадів поточного дня (К) =====================================
//var     perticipetion = 2.8;

exports.pertisipationCoefCulc = function(perticipetion){
  let perticipetionToNumber = perticipetion - 0; // perticipetion приходить у вигляди строки, перетворюємо на числовий тип.
  let     pertisipationCoeficient;
  if (perticipetionToNumber === 0) {
    console.log(`Сьогодні випало ${perticipetionToNumber} мм опадів, коефіцієнт опадів у цьому випадку становить: 1.0`);
    return pertisipationCoeficient = 1.0;}
  else if (0.05 < perticipetionToNumber && perticipetionToNumber < 0.9) {
    console.log(`Сьогодні випало ${perticipetionToNumber} мм опадів, коефіцієнт опадів у цьому випадку становить: 0.8`);
    return pertisipationCoeficient = 0.8;}
  else if (0.91 < perticipetionToNumber && perticipetionToNumber < 2.9) {
    console.log(`Сьогодні випало ${perticipetionToNumber} мм опадів, коефіцієнт опадів у цьому випадку становить: 0.6`);
    return pertisipationCoeficient = 0.6;}
  else if (2.91 < perticipetionToNumber && perticipetionToNumber < 5.9) {
    console.log(`Сьогодні випало ${perticipetionToNumber} мм опадів, коефіцієнт опадів у цьому випадку становить: 0.4`);
    return pertisipationCoeficient = 0.4;}
  else if (5.91 < perticipetionToNumber && perticipetionToNumber < 14.9) {
    console.log(`Сьогодні випало ${perticipetionToNumber} мм опадів, коефіцієнт опадів у цьому випадку становить: 0.2`);
    return pertisipationCoeficient = 0.2;}
  else if (14.91 < perticipetionToNumber){
    console.log(`Сьогодні випало ${perticipetionToNumber} мм опадів, коефіцієнт опадів у цьому випадку становить: 0`);
    return pertisipationCoeficient = 0;
  }
};
