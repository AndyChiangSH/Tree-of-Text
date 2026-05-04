# 🌲Tree-of-Text

"Tree-of-Text: A Tree-based Prompting Framework for Table-to-Text Generation in the Sports Domain", ACL SRW 2025 Long Paper (Oral)

[Paper](https://arxiv.org/abs/2604.26501) | [Slides](https://andychiangsh.github.io/Tree-of-Text/slides/slides.pdf) | [Demo](https://andychiangsh.github.io/Tree-of-Text/demo/)

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

## Demo

### [ShuttleSet+](https://andychiangsh.github.io/Tree-of-Text/demo/ShuttleSet+/)

1. **Configuration:** Framework hyperparameters · Model settings
2. **Input Tables:** ShuttleSet+ dataset · Three tables
3. **Tree-of-Text:** Click a node to view its details · Filter by operation type
4. **Output Texts:** Reference Text vs. Generated Text

### [RotoWire-FG](https://andychiangsh.github.io/Tree-of-Text/demo/RotoWire-FG/)

1. **Configuration:** Framework hyperparameters · Model settings
2. **Input Tables:** RotoWire-FG dataset · Four tables
3. **Tree-of-Text:** Click a node to view its details · Filter by operation type
4. **Output Texts:** Reference Text vs. Generated Text

### [MLB](https://andychiangsh.github.io/Tree-of-Text/demo/MLB/)

1. **Configuration:** Framework hyperparameters · Model settings
2. **Input Tables:** MLB dataset · Five tables
3. **Tree-of-Text:** Click a node to view its details · Filter by operation type
4. **Output Texts:** Reference Text vs. Generated Text
