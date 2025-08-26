# Tree-of-Text

"Tree-of-Text: A Tree-based Prompting Framework for Table-to-Text Generation in Sports Game Reports"

## Setup

1. Create the conda environment
    
    ```bash
    conda env create -f environment.yml
    ```
    
2. Activate the conda environment
    
    ```bash
    conda activate Tree-of-Text
    ```
    

## Data

### ShuttleSet+ (40/9/9)

- **table**
    - **match.csv:** overall information for the match
    - **set_1.csv:** rally-level data for set 1
    - **set_2.csv:** rally-level data for set 2
    - **set_3.csv:** rally-level data for set 3
- **text**
    - **text.txt:** human-written report for the match from online sources such as the BWF and Olympics websites

### RotoWire-FG (5340/1147/1148)

- **table**
    - **game.csv:** overall game information
    - **home_line.csv:** line score of the home team
    - **vis_line.csv:** line score of the visiting team
    - **box_score.csv:** individual player statistics
- **text**
    - **text.txt:** human-written NBA basketball game summary

### MLB (22821/1739/1744)

- **table**
    - **game.csv:** overall game information
    - **home_line.csv:** line score of the home team
    - **vis_line.csv:** line score of the visiting team
    - **box_score.csv:** individual player statistics
    - **play_by_play.csv:** scoring of each at-bat
- **text**
    - **text.txt:** human-written baseball summaries sourced from the ESPN website

## Code

### ShuttleSet+

- **Tree-of-Text.ipynb:** follow the instructions in the script and execute the steps in order: Config, Generate Report, Relation Extraction, Evaluate Report.
- **prompt**
    - **planning:** prompt for Content Planning
    - **write:** prompt for `write()` operation
    - **generating:** prompt for Content Generating

### RotoWire-FG

- **Tree-of-Text.ipynb:** follow the instructions in the script and execute the steps in order: Config, Generate Report, Relation Extraction, Evaluate Report.
- **prompt**
    - **planning:** prompt for Content Planning
    - **write:** prompt for `write()` operation
    - **generating:** prompt for Content Generating

### MLB

- **Tree-of-Text.ipynb:** follow the instructions in the script and execute the steps in order: Config, Generate Report, Relation Extraction, Evaluate Report.
- **prompt**
    - **planning:** prompt for Content Planning
    - **write:** prompt for `write()` operation
    - **generating:** prompt for Content Generating