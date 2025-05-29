Feature: Slider component

  @slider
  Scenario: Set slider value from shared storage
    Given slider value for user "STUDENT-1" is set to "50"
    When I drag the slider to the value from storage for "STUDENT-1"
    Then the slider value should match the one in storage for "STUDENT-1"
