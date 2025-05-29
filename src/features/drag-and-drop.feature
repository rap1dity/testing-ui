Feature: Drag and Drop

  @drag-and-drop
  Scenario: Perform drag and drop and verify result
    Given the user "STUDENT-1" is on the drag and drop page
    When the user "STUDENT-1" performs drag and drop action
    Then the drop result for "STUDENT-1" should be "Dropped!"
