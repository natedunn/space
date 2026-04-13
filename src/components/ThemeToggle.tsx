import { Menu } from "@base-ui/react/menu"
import { Check, Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "../lib/theme"
import { cn } from "../lib/utils"
import { Button } from "./ui/button"

const options = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Menu.Root>
      <Menu.Trigger
        render={
          <Button variant="ghost" size="icon" aria-label="Toggle theme" />
        }
      >
        <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={8} align="start" className="z-50">
          <Menu.Popup
            className={cn(
              "z-50 min-w-[8rem] overflow-hidden rounded-md bg-popover p-1 text-popover-foreground shadow-md",
              "origin-[var(--transform-origin)] transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0"
            )}
          >
            <Menu.RadioGroup
              value={theme}
              onValueChange={(value) =>
                setTheme(value as "light" | "dark" | "system")
              }
            >
              {options.map(({ value, label, icon: Icon }) => (
                <Menu.RadioItem
                  key={value}
                  value={value}
                  className="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span>{label}</span>
                  <Menu.RadioItemIndicator className="ml-auto">
                    <Check className="h-3.5 w-3.5" />
                  </Menu.RadioItemIndicator>
                </Menu.RadioItem>
              ))}
            </Menu.RadioGroup>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}
