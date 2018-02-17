# Calorie Counting App Plan / Notes

## Data Model

Example Model/Shape: 

```javascript
meal = {
  id: 1,
  description: 'Breakfast', 
  calories: 460
}
model = {
  meals: [],
  showForm: false,
  description: 'Dinner',
  calories: 600,
  editId: 3,
  nextId: 1,
}
```

## View Functions

view
  formView
    fieldSet
    buttonSet
  tableView
    tableHeader
    mealsBody
      mealRow
        cell
      totalRow 