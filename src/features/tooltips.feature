Feature: Tooltips display

  @tooltips
  Scenario: User sees correct tooltip on hover
    Given the user "STUDENT-1" is on the tooltips page
    When the user "STUDENT-1" hovers over the following elements:
      | element | tooltipText                        |
      | button  | You hovered over the Button        |
      | field   | You hovered over the text field    |
    Then the tooltip text should be correct for each element for "STUDENT-1"
