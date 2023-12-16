export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type ChangeTodolistTitleArgs = { todolistId: string; title: string };
