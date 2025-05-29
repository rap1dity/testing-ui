Feature: Date Picker field

  @date
  Scenario: Filling the date picker field from the storage
    Given a date "05/29/2025" is set in storage for user "STUDENT-1"
    When I fill the date picker field using the stored date for "STUDENT-1"
    Then the date picker field should contain the stored date for "STUDENT-1"
