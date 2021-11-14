import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { ReactNode } from "react"

interface State {
  numClicks: number
  isFocused: boolean
}

class Streamlit_navbar001 extends StreamlitComponentBase<State> {
  public state = { numClicks: 0, isFocused: false }

  public render = (): ReactNode => {
    const navbar_buttons = this.props.args["navbar_buttons"]

    // Streamlit sends us a theme object via props that we can use to ensure
    // that our component has visuals that match the active theme in a
    // streamlit app.
    const { theme } = this.props
    const style: React.CSSProperties = {}

    // Maintain compatibility with older versions of Streamlit that don't send
    // a theme object.
    if (theme) {
      // Use the theme object to style our button border. Alternatively, the
      // theme style is defined in CSS vars.
      const borderStyling = `1px solid ${
        this.state.isFocused ? theme.primaryColor : "gray"
      }`
      style.border = borderStyling
      style.outline = borderStyling
    }

    return (    
      <div className="btn-toolbar">
      
        <React.Fragment>
          {Object.keys(navbar_buttons).map(key => (
            <div className="btn-group mr-1" role="group" key={navbar_buttons[key]['id']}>
            <button className="btn btn-primary" type="button" id={navbar_buttons[key]['id']} key={navbar_buttons[key]['id']} onClick={this.onClicked.bind(this)}>{navbar_buttons[key]['name']}</button>
            </div>
          ))}
        </React.Fragment>
      
      </div>
    )
  }

  private onClicked = (e: React.MouseEvent<HTMLElement>): void => {
    e.persist()
    this.setState(
      () => Streamlit.setComponentValue((e.target as any).id)
    )
  }

}

export default withStreamlitConnection(Streamlit_navbar001)
