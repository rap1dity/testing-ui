Feature: Selecting options in select menus

  @select-menu
  Scenario: Selecting options from all dropdowns
    Given the user "STUDENT-1" is on the select menu page
    And the user "STUDENT-1" wants to select the following options:
      | selectValue      | Group 2, option 1 |
      | selectOne        | Other             |
      | oldSelect        | Green             |
      | multiSelect      | Black, Blue       |
    When the user "STUDENT-1" selects these options
    Then the selected options for "STUDENT-1" should be displayed
