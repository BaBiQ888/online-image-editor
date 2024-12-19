export const getBackgroundStyle = (background) => {
  switch (background.type) {
    case 'color':
      return {
        backgroundColor: background.color,
        opacity: background.opacity,
      };
    case 'gradient':
      return {
        background: `linear-gradient(${background.gradient.direction}, ${background.gradient.from}, ${background.gradient.to})`,
        opacity: background.opacity,
      };
    case 'image':
      return {
        backgroundImage: `url(${background.url})`,
        backgroundSize: `${(background.scale || 1) * 100}%`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: background.opacity,
        filter: background.blur ? `blur(${background.blur}px)` : undefined,
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
    default:
      return {
        background: 'transparent',
      };
  }
};
