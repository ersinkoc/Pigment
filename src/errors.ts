export class PigmentError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = 'PigmentError';
    this.code = code;
    Error.captureStackTrace(this, PigmentError);
  }
}

export class PluginError extends PigmentError {
  constructor(pluginName: string, message: string) {
    super(`[${pluginName}] ${message}`, 'PLUGIN_ERROR');
    this.name = 'PluginError';
  }
}

export class ColorError extends PigmentError {
  constructor(message: string) {
    super(message, 'COLOR_ERROR');
    this.name = 'ColorError';
  }
}

export class EnvironmentError extends PigmentError {
  constructor(message: string) {
    super(message, 'ENVIRONMENT_ERROR');
    this.name = 'EnvironmentError';
  }
}

export class KernelError extends PigmentError {
  constructor(message: string) {
    super(message, 'KERNEL_ERROR');
    this.name = 'KernelError';
  }
}

export class StyleError extends PigmentError {
  constructor(message: string) {
    super(message, 'STYLE_ERROR');
    this.name = 'StyleError';
  }
}
